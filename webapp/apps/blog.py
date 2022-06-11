import ssl
import dash_bootstrap_components as dbc
from dash import dcc, html, Output, Input
from app import app


def blog_page():
    blog1 = html.Div(
        dbc.Card(
            dbc.CardBody(
                dcc.Markdown(
                    """
        # This is my first Blog Post    Hi, my name is Eric and I love to write. I write about data   science, programming, and life.    Thanks for reading!
        """
                )
            )
        )
    )

    layout = html.Div(
        style={"background-position": "center"},
        children=[
            dbc.Container(
                id="card-cont",
                children=[blog1],
                style={
                    "background-color": "white",
                },
            )  # end container
        ],
    )
