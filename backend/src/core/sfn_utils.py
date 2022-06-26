import csv
import json
from io import StringIO
from typing import Any, Sequence

import boto3


def extract_sfn_output(described_exc: dict, s3_key) -> dict:
    if not s3_key.endswith(".csv"):
        raise NotImplementedError(f"unknown filetype for {s3_key=}")
    return json.loads(described_exc.pop("output"))


def obtain_relevant_exc_history(execution_arn: str):
    exc_history = boto3.client("stepfunctions").get_execution_history(
        executionArn=execution_arn,
        reverseOrder=True,
        includeExecutionData=False,
    )["events"]

    exc_history_types = tuple(i["type"] for i in exc_history)
    if "TaskTimedOut" in exc_history_types:
        idx = exc_history_types.index("ExecutionFailed")
        return exc_history[idx]
    elif "ExecutionFailed" in exc_history_types:
        idx = exc_history_types.index("ExecutionFailed")
        return exc_history[idx]
    else:
        if idx := exc_history_types.index("TaskStarted"):
            return exc_history[idx]
        else:
            return exc_history.pop(0)


def estimate_total_processed_percentage(execution_arn: str):
    sfn_client = boto3.client("stepfunctions")
    execution_events_quantity = len(
        sfn_client.get_execution_history(
            executionArn=execution_arn,
            reverseOrder=True,
            includeExecutionData=False,
        )["events"]
    )
    _sfn_definition = sfn_client.describe_state_machine_for_execution(
        executionArn=execution_arn
    )["definition"]
    sfn_definition_states_quantity = len(json.loads(_sfn_definition)["States"])

    # "estimate"
    estimated_execution_events = 5 * sfn_definition_states_quantity
    percentage = execution_events_quantity / estimated_execution_events
    return min(percentage, 1)


def reorder_csv_headers(filepath_or_buffer, new_fields: Sequence[str]) -> StringIO:
    outfile = StringIO()
    writer = csv.DictWriter(outfile, fieldnames=new_fields)
    # reorder the header first
    writer.writeheader()
    for row in csv.DictReader(filepath_or_buffer):
        writer.writerow(row)  # writes the reordered rows to the new file
    return StringIO(outfile.getvalue())  # dumb fix


def proceed_sfn(execution_arn: str, json_serializable_output: Any = None) -> dict:
    if not json_serializable_output:
        json_serializable_output: Any = {}
    output: str = json.dumps(json_serializable_output)

    client = boto3.client("stepfunctions")
    response: dict = client.get_execution_history(
        reverseOrder=True, executionArn=execution_arn
    )
    # safely get nested task tokens
    response: dict = response.get("events", {})
    task_tokens = (i.get("taskScheduledEventDetails", {}) for i in response)
    task_tokens = (i.get("parameters", {}) for i in task_tokens if i)
    task_tokens = (json.loads(i) for i in task_tokens if i)
    task_tokens = (i.get("Message", {}) for i in task_tokens if i)
    task_tokens = (i.get("TaskToken", {}) for i in task_tokens if i)
    if not (latest_task_token := next(task_tokens)):
        raise ValueError(f"sorry, no TaskToken found for {execution_arn=}")
    return client.send_task_success(taskToken=latest_task_token, output=output)
