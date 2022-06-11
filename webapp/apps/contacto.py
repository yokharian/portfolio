import ssl
import dash_bootstrap_components as dbc
from dash import dcc, html, Output, Input
from app import app

email_input = dbc.Row(
    [
        dbc.Label("Email", html_for="example-email-row", width=2),
        dbc.Col(
            dbc.Input(type="email", id="example-email-row", placeholder="Enter email"),
            width=10,
        ),
    ],
)
user_input = dbc.Row(
    [
        dbc.Label("Name", html_for="example-name-row", width=2),
        dbc.Col(
            dbc.Input(
                type="text",
                id="example-name-row",
                placeholder="Enter Name",
                maxLength=80,
            ),
            width=10,
        ),
    ],
)
message = dbc.Row(
    [
        dbc.Label("Message", html_for="example-message-row", width=2),
        dbc.Col(
            dbc.Textarea(
                id="example-message-row",
                className="mb-3",
                placeholder="Enter message",
                required=True,
            ),
            width=10,
        ),
    ],
)


def contact_page():
    markdown = """# Formulario de contacto
### Envíe un mensaje si tiene un comentario, pregunta o inquietud. ¡Gracias!"""
    form = html.Div(
        [
            dbc.Container(
                [
                    dcc.Markdown(markdown),
                    html.Br(),
                    dbc.Card(
                        dbc.CardBody(
                            [
                                dbc.Form([email_input, user_input, message]),
                                html.Div(
                                    id="div-button",
                                    children=[
                                        dbc.Button(
                                            "Submit",
                                            color="primary",
                                            id="button-submit",
                                            n_clicks=0,
                                        )
                                    ],
                                ),
                            ]
                        )
                    ),
                    html.Br(),
                    html.Br(),
                ]
            )
        ]
    )
    return html.Div(
        style={"background-position": "center"},
        children=[
            dbc.Container(
                id="card-cont",
                children=[form],
                style={"background-color": "white"},
            ),
        ],
    )


@app.callback(
    [Output("div-button", "children")],
    [
        Input("button-submit", "n_clicks"),
        Input("example-email-row", "value"),
        Input("example-name-row", "value"),
        Input("example-message-row", "value"),
    ],
)
def submit_message(n, email, name, message):
    if n > 0:
        # TODO send message using aws ses
        ...
    else:
        return [dbc.Button("Submit", color="primary", id="button-submit", n_clicks=0)]
