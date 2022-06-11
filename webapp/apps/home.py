from dash import html
import dash_bootstrap_components as dbc

layout = html.Div(
    [
        dbc.Container(
            [
                dbc.Row(
                    [
                        dbc.Col(
                            html.H1(
                                "Welcome to the COVID-19 dashboard",
                                className="text-center",
                            ),
                            className="mb-5 mt-5",
                        )
                    ]
                ),
                dbc.Row(
                    [
                        dbc.Col(
                            html.H5(
                                children="This app marks my very first attempt at using Plotly, Dash and Bootstrap! "
                            ),
                            className="mb-4",
                        )
                    ]
                ),
                dbc.Row(
                    [
                        dbc.Col(
                            html.H5(
                                children="It consists of two main pages: Global, which gives an overview of the COVID-19 cases and deaths around the world, "
                                "Singapore, which gives an overview of the situation in Singapore after different measures have been implemented by the local government."
                            ),
                            className="mb-5",
                        )
                    ]
                ),
                dbc.Row(
                    [
                        dbc.Col(
                            dbc.Card(
                                children=[
                                    html.H3(
                                        children="Get the original datasets used in this dashboard",
                                        className="text-center",
                                    ),
                                    dbc.Row(
                                        [
                                            dbc.Col(
                                                dbc.Button(
                                                    "Global",
                                                    href="https://data.europa.eu/euodp/en/data/dataset/covid-19-coronavirus-data/resource/55e8f966-d5c8-438e-85bc-c7a5a26f4863",
                                                    color="primary",
                                                ),
                                                className="mt-3",
                                            ),
                                            dbc.Col(
                                                dbc.Button(
                                                    "Singapore",
                                                    href="https://data.world/hxchua/covid-19-singapore",
                                                    color="primary",
                                                ),
                                                className="mt-3",
                                            ),
                                        ],
                                        justify="center",
                                    ),
                                ],
                                body=True,
                                color="dark",
                                outline=True,
                            ),
                            width=4,
                            className="mb-4",
                        ),
                        dbc.Col(
                            dbc.Card(
                                children=[
                                    html.H3(
                                        children="Access the code used to build this dashboard",
                                        className="text-center",
                                    ),
                                    dbc.Button(
                                        "GitHub",
                                        href="https://github.com/meredithwan/covid-dash-app",
                                        color="primary",
                                        className="mt-3",
                                    ),
                                ],
                                body=True,
                                color="dark",
                                outline=True,
                            ),
                            width=4,
                            className="mb-4",
                        ),
                        dbc.Col(
                            dbc.Card(
                                children=[
                                    html.H3(
                                        children="Read the Medium article detailing the process",
                                        className="text-center",
                                    ),
                                    dbc.Button(
                                        "Medium",
                                        href="https://medium.com/@meredithwan",
                                        color="primary",
                                        className="mt-3",
                                    ),
                                ],
                                body=True,
                                color="dark",
                                outline=True,
                            ),
                            width=4,
                            className="mb-4",
                        ),
                    ],
                    className="mb-5",
                ),
                html.A(
                    "Special thanks to Flaticon for the icon in COVID-19 Dash's logo.",
                    href="https://www.flaticon.com/free-icon/coronavirus_2913604",
                ),
            ]
        )
    ]
)
