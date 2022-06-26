from dash.dependencies import Input, Output

from src.core.app import app, server
from src.apps import know_this_web_app, contact, home,about_me
from src.apps.experience import airflow_cheap, alb, cheap_bi


@app.callback(Output("page-content", "children"), [Input("url", "pathname")])
def display_page(pathname):
    if pathname == "/meet_web_app":
        return know_this_web_app.layout
    elif pathname == "/contacto":
        return contact.layout
    elif pathname == "/airflow_cheap":
        return airflow_cheap.layout
    elif pathname == "/application_load_balancer":
        return alb.layout
    elif pathname == "/about_me":
        return about_me.layout
    elif pathname == "/cheap_bi_infrastructure":
        return cheap_bi.layout
    else:
        return home.layout


if __name__ == "__main__":
    server.run(debug=True)
