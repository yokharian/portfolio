from dash import html
import dash_bootstrap_components as dbc

from ...core.config import CDN_URL

layout = html.Div(
    [
        dbc.Container(
            [
                dbc.Row(
                    [
                        dbc.Col(
                            html.H1(
                                "Self-managed airflow infrastructure cheaper "
                                "than aws mwaa service",
                                className="text-center",
                            ),
                            className="mb-5 mt-5",
                        )
                    ]
                ),
                dbc.Row(
                    [
                        dbc.Col(
                            html.Img(
                                src=CDN_URL+"airflow_cheap.svg",
                                style={"height": "100%", "width": "100%"},
                            ),
                            style={"textAlign": "center"},
                        )
                    ],
                ),
                dbc.Row([dbc.Col(html.Br())]),
                dbc.Row([dbc.Col(html.Br())]),
                dbc.Row([dbc.Col(html.Br())])
            ]
        )
    ]
)
