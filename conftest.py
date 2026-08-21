from __future__ import annotations

import os
import socket
import threading
import time
import urllib.request

import pytest

from serve import make_server


@pytest.fixture()
def server_url():
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        port = sock.getsockname()[1]
    web = os.path.join(os.path.dirname(__file__), "web")
    server = make_server(web, port)
    thread = threading.Thread(target=server.serve_forever, daemon=True)
    thread.start()
    time.sleep(0.1)
    try:
        yield f"http://127.0.0.1:{port}"
    finally:
        server.shutdown()
        thread.join(timeout=2)
