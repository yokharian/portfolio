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
                                "Lorem ipsum dolor sit amet",
                                className="text-center",
                            ),
                            className="mb-5 mt-5",
                        )
                    ],
                ),
                dbc.Row(
                    [
                        dbc.Col(
                            html.H5(
                                children="Lorem ipsum dolor sit amet "
                                "consectetur adipiscing elit cras "
                                "porta !"
                            ),
                            className="mb-4",
                        )
                    ]
                ),
                dbc.Row(
                    [
                        dbc.Col(
                            html.H5(
                                children="montes etiam quisque bibendum ac urna, ultricies mauris enim imperdiet commodo velit consequat et phasellus dis conubia ornare nibh. Egestas quam ultrices aptent pretium posuere risus fames curabitur,"
                            ),
                            className="mb-5",
                        )
                    ]
                )
            ]
        )
    ]
)
