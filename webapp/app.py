import dash
import dash_bootstrap_components as dbc
from dash.dependencies import Input, Output, State

# bootstrap theme
# https://bootswatch.com/lux/
from flask import Flask

external_stylesheets = [dbc.themes.ZEPHYR, dbc.icons.FONT_AWESOME]

server = Flask(__name__)
APP_DEFAULT_TITLE = "Sofia Portfolio"


app = dash.Dash(
    __name__,
    server=server,
    external_stylesheets=external_stylesheets,
    serve_locally=False,
    title="Sofia Portfolio",
)
app.config.suppress_callback_exceptions = True
