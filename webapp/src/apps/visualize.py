from datetime import datetime
from functools import reduce
import locale

from dateutil.relativedelta import relativedelta
import pandas as pd
import pytz
from pytrends.request import TrendReq
import plotly.graph_objects as go
from datetime import timezone
from plotly.subplots import make_subplots
from utils import chunker, parse_datetimes

locale.setlocale(locale.LC_TIME, "es_MX.UTF-8")
python_color = "#306998"

lista_palabras = {
    "javascript": "#ffd43b",
    "C/C++": "black",
    "JAVA": "red",
    "R language": "blue",
    "Kotlin": "orange",
    "C#": "green",
    "Go": "cyan",
    "Scala": "red",
}
# TrendReq.get_historical_interest = get_historical_interest
TREND_REQ = TrendReq(
    hl="en-US", tz=360, timeout=(10, 25), retries=2, backoff_factor=0.1
)
ONE_DAY = 60 * 60 * 24
RELATIVE_TIME_IN_SECONDS = ONE_DAY * 7

if __name__ == "__main__":
    NOW: datetime = datetime.now(timezone.utc)
    dates = parse_datetimes(start=NOW - relativedelta(weeks=1), stop=NOW)
    for chunk in chunker(lista_palabras, 4):
        keywords = chunk + ["python"]
        df = TREND_REQ.get_historical_interest(
            keywords, **dates, geo=None, cat=0, frequency="daily"
        )
        print(df)
    exit()

    output = reduce(
        lambda left, right: pd.merge(
            left, right, left_index=True, right_index=True, how="outer"
        ),
        output,
    )
    output = output.groupby(pd.Grouper(freq="M")).sum()
    output = output.reset_index().melt("date")
    output["month_and_year"] = output["date"].dt.strftime("%B %Y")
    fig = make_subplots(
        rows=2,
        cols=1,
        subplot_titles=("resumen mensual", "TOTAL"),
    )
    for language, df in output.groupby("variable"):
        fig.add_trace(
            go.Scatter(
                x=df["month_and_year"],
                y=df["value"],
                line=dict(
                    color=lista_palabras[language],
                    width=4 if "python" in language else 1,
                ),
                name=language,
                line_shape="spline",
                hovertemplate="%{y} busquedas en %{x}",
                mode="lines+markers",
            ),
            row=1,
            col=1,
        )
    fig.update_yaxes(showspikes=False, spikesnap="cursor", row=1, col=1)
    fig.update_xaxes(showspikes=True, spikesnap="cursor", row=1, col=1)

    # second plot
    output_summary: pd.Series = output[["variable", "value"]].groupby("variable").sum()
    output_summary.reset_index(inplace=True)
    output_summary.sort_values(by="value")
    for language, df in output_summary.groupby("variable"):
        fig.add_trace(
            go.Bar(
                x=df["variable"],
                y=df["value"],
                name=language,
                hovertemplate="%{y} busquedas",
                marker_color=lista_palabras[language]
                if "python" in language
                else "gray",
            ),
            row=2,
            col=1,
        )
    py_searchs = output_summary[output_summary["variable"] == "python"]["value"].sum()
    py_searchs_offset = py_searchs * 0.05  # 5% percent
    fig.add_hrect(
        y0=py_searchs - py_searchs_offset,
        y1=py_searchs + py_searchs_offset,
        row=2,
        col=1,
        opacity=0.25,
        line_width=0,
        fillcolor=lista_palabras["python"],
    )
    fig.update_layout(
        title="Tendencia de lenguajes de programación último año",
        showlegend=True,
        xaxis=dict(autorange=True),
        yaxis=dict(autorange=True),
        dragmode=False,
        xaxis_title="Fecha (mes)",
        yaxis_title="Busquedas en google",
        hoverdistance=2000,
        spikedistance=100,
        updatemenus=[
            dict(
                type="buttons",
                direction="right",
                showactive=True,
                x=1,
                y=1,
                buttons=[
                    dict(
                        method="restyle",
                        label="Esconder Todo",
                        visible=True,
                        args=[{"visible": True}],
                        args2=[{"visible": "legendonly"}],
                    )
                ],
            )
        ],
        showTips=False,
    )
    config = {"displayModeBar": False}
    fig.show(config=config)
