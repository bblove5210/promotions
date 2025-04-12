# Image for a NYU Lab development environment
FROM rofrano/nyu-devops-base:sp25

USER root
# Set up the Python development environment
WORKDIR /app
COPY Pipfile Pipfile.lock ./
RUN python -m pip install --upgrade pip pipenv && \
    pipenv install --system --dev

# Install dependencies for Node.js installation
RUN apt-get update && apt-get install -y \
    curl \
    ca-certificates \
    gnupg \
    lsb-release

# Add NodeSource repository for Node.js 16.x (change 16.x to the version you need)
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -

# Install Node.js and npm
RUN apt-get update && apt-get install -y nodejs

# Install user mode tools
COPY .devcontainer/scripts/install-tools.sh /tmp/
RUN cd /tmp && bash ./install-tools.sh
