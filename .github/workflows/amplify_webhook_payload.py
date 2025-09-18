#!/usr/bin/env python3
"""Emit JSON payload for the Amplify webhook trigger."""
from __future__ import annotations

import json
import os
import sys


def main() -> int:
    payload = {
        "source": "github-actions",
        "commit": os.environ.get("COMMIT_SHA", ""),
        "branch": os.environ.get("BRANCH_NAME", ""),
    }

    reason = os.environ.get("DEPLOY_REASON", "").strip()
    if reason:
        payload["reason"] = reason

    json.dump(payload, sys.stdout)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
