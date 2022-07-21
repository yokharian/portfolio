import dash_bootstrap_components as dbc
from dash import Input, Output, dcc, html
from ..core.app import app
from ..core.utils import send_email

email_input = dbc.Row(
    [
        dbc.Label("Email", html_for="example-email-row", width=5),
        dbc.Col(
            dbc.Input(
                type="email", id="example-email-row", placeholder="Enter email"
            ),
            width=10,
        ),
    ],
)
user_input = dbc.Row(
    [
        dbc.Label("Name", html_for="example-name-row", width=4),
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
message_input = dbc.Row(
    [
        dbc.Col(
            dbc.Label("Message", html_for="example-message-row", width=7),
            width=250,
        ),
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


markdown = """# Contact form
### Send a message if you have a comment, question or concern. Thank you!"""
form = html.Div(
    [
        dbc.Container(
            [
                dcc.Markdown(markdown),
                html.Br(),
                dbc.Card(
                    dbc.CardBody(
                        [
                            dbc.Form([email_input, user_input, message_input]),
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
layout = html.Div(
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
        send_email(email,name,message)
        return [html.P("Email sent !")]
    else:
        return [
            dbc.Button(
                "Submit", color="primary", id="button-submit", n_clicks=0
            )
        ]
