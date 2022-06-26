from dash import html
import dash_bootstrap_components as dbc
from ...core.app import app
from ...core.config import CDN_URL

layout = html.Div(
    [
        dbc.Container(
            [
                dbc.Row(
                    [
                        dbc.Col(
                            html.H1(
                                "infrastructure of this web application",
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
                                src=CDN_URL+"arquitectura.svg",
                                style={"height": "100%", "width": "100%"},
                            ),
                            style={"textAlign": "center"},
                        )
                    ],
                ),
                dbc.Row([dbc.Col(html.Br())]),
                dbc.Row([dbc.Col(html.Br())]),
                dbc.Row([dbc.Col(html.Br())]),
                dbc.Row(
                    [
                        dbc.Col(
                            html.A(
                                children=html.H2(
                                    "GitHub Repositoryww",
                                    className="text-center",
                                ),
                                className="mb-5 mt-5",
                                href="https://github.com/yokharian/portfolio",
                            )
                        )
                    ]
                ),
                dbc.Row([dbc.Col(html.Br())]),
                dbc.Row([dbc.Col(html.Br())]),
                dbc.Row([dbc.Col(html.Br())]),
                dbc.Row([dbc.Col(html.Br())]),
                dbc.Row([dbc.Col(html.Br())]),
            ]
        )
    ]
)
