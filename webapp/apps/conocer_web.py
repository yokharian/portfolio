from dash import html
import dash_bootstrap_components as dbc
from app import app

layout = html.Div(
    [
        dbc.Container(
            [
                dbc.Row(
                    [
                        dbc.Col(
                            html.H1(
                                "Diagrama de la pagina web",
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
                                src=app.get_asset_url("arquitectura.svg"),
                                style={"height": "100%", "width": "100%"},
                            ),
                            style={"textAlign": "center"},
                        )
                    ],
                ),
                dbc.Row([dbc.Col(html.Br())]),
                dbc.Row(
                    [
                        dbc.Col(
                            html.A(
                                children=html.H2(
                                    "Repositorio de GitHub",
                                    className="text-center",
                                ),
                                className="mb-5 mt-5",
                                href="https://github.com/yokharian/soysofia-portfolio",
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
