set -eux \
    && cd /tmp/ \
    && apt-get update \
    && apt-get install --quiet --yes --no-install-recommends \
        build-essential \
    && apt-get clean \
    && python -m pip install --upgrade pip \
    && pip install --no-cache-dir \
        Cython==0.29.22 \
        pip \
        setuptools \
    && pip install \
        --no-cache-dir \
        --no-binary pydantic \
        --global-option=build_ext \
        --global-option=-j8 \
        pydantic\
    && pip uninstall --yes \
        Cython \
        setuptools \
    && apt-get purge --auto-remove --yes \
        build-essential \
    && apt-get clean \
    && rm --recursive --force /var/lib/apt/lists/* /tmp/* /var/tmp/*
