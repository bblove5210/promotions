FROM rofrano/nyu-devops-base:sp25
WORKDIR /app

# Copy Pipfiles first to cache the environment setup
COPY Pipfile Pipfile.lock ./
RUN python -m pip install --upgrade pip pipenv && \
    pipenv install --system --dev

# Now copy the entire repo (including tests)
COPY . /app

# Optionally fix permissions or set a non-root user
RUN chown -R CITest:CITest /app
USER CITest

COPY .devcontainer/scripts/install-tools.sh /tmp/
RUN cd /tmp && bash ./install-tools.sh
