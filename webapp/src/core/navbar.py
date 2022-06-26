from dash import dcc, html
from dash.dependencies import Input, Output, State
import dash_bootstrap_components as dbc

from .app import app

# building the navigation bar
# https://github.com/facultyai/dash-bootstrap-components/blob/master/examples/advanced-component-usage/Navbars.py

from .config import CDN_URL

dropdown = dbc.DropdownMenu(
    children=[
        dbc.DropdownMenuItem("Cheap Airflow", href="/airflow_cheap"),
        dbc.DropdownMenuItem(
            "Load Balanced Web server", href="/application_load_balancer"
        ),
        dbc.DropdownMenuItem(
            "Cheap Bi Infrastructure", href="/cheap_bi_infrastructure"
        ),

        dbc.DropdownMenuItem(
            "This web app", href="/meet_web_app"

        ),
    ],
    nav=True,
    in_navbar=True,
    label="Experience",
)

navbar = dbc.Navbar(
    dbc.Container(
        [
            html.A(
                # Use row and col to control vertical alignment of logo / brand
                dbc.Row(
                    [
                        dbc.Col(html.I(className="fa-brands fa-python fa-3x")),
                        dbc.Col(
                            dbc.NavbarBrand(
                                "Sofia Portfolio", className="ml-2"
                            )
                        ),
                    ],
                    align="center",
                ),
                href="/home",
            ),
            dbc.NavbarToggler(id="navbar-toggler2"),
            dbc.Collapse(
                dbc.Nav(
                    [
                        dbc.NavItem(dbc.NavLink("Contact", href="/contacto")),
                        html.A(
                            dbc.NavItem(dbc.NavLink("Curriculum")),
                            href=f"{CDN_URL}cv.pdf",
                        ),
                        dropdown,
                        dbc.NavItem(
                            dbc.NavLink(
                                "About me", href="/about_me"
                            )
                        ),
                    ],
                    className="ml-auto",
                    navbar=True,
                ),
                id="navbar-collapse2",
                navbar=True,
            ),
        ]
    ),
    color="dark",
    dark=True,
    className="mb-4",
)


def toggle_navbar_collapse(n, is_open):
    return not is_open if n else is_open


for i in [2]:
    app.callback(
        Output(f"navbar-collapse{i}", "is_open"),
        [Input(f"navbar-toggler{i}", "n_clicks")],
        [State(f"navbar-collapse{i}", "is_open")],
    )(toggle_navbar_collapse)

# embedding the navigation bar
app.layout = html.Div(
    [
        dcc.Location(id="url", refresh=False),
        navbar,
        html.Div(id="page-content"),
    ]
)
