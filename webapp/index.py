from dash import dcc
from dash import html
from dash.dependencies import Input, Output, State
import dash_bootstrap_components as dbc

from app import app, server

# import all pages in the app
from apps import home, conocer_web, experiencia, contacto

navbar = dbc.Navbar(
    dbc.Container(
        [
            html.A(
                # Use row and col to control vertical alignment of logo / brand
                dbc.Row(
                    [
                        dbc.Col(html.I(className="fa-brands fa-python fa-3x")),
                        dbc.Col(dbc.NavbarBrand("Sofia Portfolio", className="ml-2")),
                    ],
                    align="center",
                ),
                href="/home",
            ),
            dbc.NavbarToggler(id="navbar-toggler2"),
            dbc.Collapse(
                dbc.Nav(
                    [
                        dbc.NavItem(dbc.NavLink("Experiencia", href="/experiencia")),
                        dbc.NavItem(dbc.NavLink("Contacto", href="/contacto")),
                        dbc.NavItem(
                            dbc.NavLink("Conocer La Pagina Web", href="/conocer_web")
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
    if n:
        return not is_open
    return is_open


for i in [2]:
    app.callback(
        Output(f"navbar-collapse{i}", "is_open"),
        [Input(f"navbar-toggler{i}", "n_clicks")],
        [State(f"navbar-collapse{i}", "is_open")],
    )(toggle_navbar_collapse)

# embedding the navigation bar
app.layout = html.Div(
    [dcc.Location(id="url", refresh=False), navbar, html.Div(id="page-content")]
)


@app.callback(Output("page-content", "children"), [Input("url", "pathname")])
def display_page(pathname):
    if pathname == "/global_situation":
        return global_situation.layout
    elif pathname == "/conocer_web":
        return conocer_web.layout
    elif pathname == "/contacto":
        return contacto.contact_page()
    elif pathname == "/experiencia":
        return experiencia.layout
    elif pathname == "/singapore":
        return singapore.layout
    else:
        return home.layout


if __name__ == "__main__":
    app.run_server(host="127.0.0.1", debug=True)
