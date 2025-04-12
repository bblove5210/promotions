FROM rofrano/nyu-devops-base:sp25

USER root

WORKDIR /app

# Copy Pipfiles first for dependency caching
COPY Pipfile Pipfile.lock ./
RUN python -m pip install --upgrade pip pipenv && \
    pipenv install --system --dev

RUN pip install flask-cors
# Copy the rest of your project (including tests)
COPY . /app

# Install user mode tools
COPY .devcontainer/scripts/install-tools.sh /tmp/
RUN cd /tmp && bash ./install-tools.sh
