from dash import html
import dash_bootstrap_components as dbc

from ..core.config import CDN_URL

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
                ),
                dbc.Row(
                    [],
                ),
                dbc.Row(
                    [
                        dbc.Col(
                            dbc.Card(
                                children=[
                                    html.Img(
                                        src=CDN_URL
                                        + "Paiton_monocroma_light.png",
                                        style={
                                            "height": "100%",
                                            "width": "100%",
                                        },
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
                            html.Img(
                                src=CDN_URL + "hearth.png",
                                style={
                                    "height": "100%",
                                    "width": "100%",
                                },
                            ),
                            width=4,
                            className="mb-4",
                        ),
                        dbc.Col(
                            dbc.Card(
                                children=[
                                    html.A(
                                        html.Img(
                                            src="https://images.credly.com/size/340x340/images/0e284c3f-5164-4b21-8660-0d84737941bc/image.png",
                                            style={
                                                "height": "100%",
                                                "width": "100%",
                                            },
                                        ),
                                        href="https://www.credly.com/badges/e4b07a5b-596f-4a8e-bce5-9cdafd633646/embedded",
                                    )
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
            ]
        ),
    ]
)
