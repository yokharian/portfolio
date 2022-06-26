[![FASTAPI](https://raw.githubusercontent.com/Buuntu/fastapi-react/master/assets/fastapi-logo.png)](https://fastapi.tiangolo.com/)

# Portfolio - BACKEND
[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://black.readthedocs.io/en/stable/)

Python serverless microservice 
with backend low level code operations & data team app communication.

#### please make sure to read each folder **readme.md** for more info about specific implementations

---
## Usage
⚠️ [Git](https://git-scm.com/downloads), [Python](https://www.python.org/), [Poetry](https://python-poetry.org/), [Serverless](https://www.serverless.com/framework/docs/getting-started) must be installed and accessible ⚠️
```bash
# make sure you are in backend directory
serverless # to trigger first install steps, (you'll need aws user keys)
# install all plugins needed, updated 29/12/2000

sls plugin install -n serverless-provisioned-concurrency-autoscaling && 
sls plugin install -n serverless-deployment-bucket && 
sls plugin install -n serverless-python-requirements && 
sls plugin install -n serverless-plugin-optimize
# install libraries
poetry install
# test microservice locally
python debug_main.py
```


---

# [-] DEVELOPERS

## Troubleshoot

### 1.- `$ poetry install` in backend folder -->
```bash
    Complete output (3 lines):
  Traceback (most recent call last):
    File "<string>", line 1, in <module>
  ModuleNotFoundError: No module named 'setuptools'
```
##### solution:
delete poetry.lock file and try again

---

### 2.- `$ poetry install` in backend folder -->
```bash
  module.c:1:10: fatal error: Python.h: No such file or directory
      1 | #include <Python.h>
        |          ^~~~~~~~~~
  compilation terminated.
  error: command '/usr/bin/x86_64-linux-gnu-gcc' failed with exit code 1
  ----------------------------------------
  ERROR: Failed building wheel for ciso8601
Failed to build ciso8601
ERROR: Could not build wheels for ciso8601, which is required to install pyproject.toml-based projects
```
##### solution:
downgrade to python 3.8 and try again


---

### 3.- `$ sls deploy` in backend folder -->
```bash
FUNCTION_ERROR_INIT_FAILURE plainly means there's something wrong with the function's handler/code that i'm trying to deploy, w/c is why provisioned lambdas can't start up/initialize.
```
##### solution:
plainly means there's something wrong with the function's handler/code that i'm trying to deploy, w/c is why provisioned lambdas can't start up/initialize.

---

