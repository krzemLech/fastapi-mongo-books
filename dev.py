import os
import signal
import subprocess
import sys
import time
from pathlib import Path


def main() -> int:
    project_root = Path(__file__).parent.resolve()

    # Commands to run: backend (uvicorn) and frontend (pnpm dev)
    backend_cmd = [
        "uvicorn",
        "app.main:app",
        "--host",
        "0.0.0.0",
        "--port",
        "4000",
        "--reload",
    ]

    frontend_cmd = [
        "pnpm",
        "dev",
    ]

    processes: list[subprocess.Popen] = []

    def terminate_all() -> None:
        for proc in processes:
            if proc.poll() is None:
                try:
                    proc.terminate()
                except Exception:
                    pass
        # Give processes a moment to exit gracefully
        deadline = time.time() + 5
        for proc in processes:
            while proc.poll() is None and time.time() < deadline:
                time.sleep(0.1)
        for proc in processes:
            if proc.poll() is None:
                try:
                    proc.kill()
                except Exception:
                    pass

    def handle_sigint(signum, frame):  # type: ignore[no-untyped-def]
        terminate_all()
        sys.exit(0)

    # Trap Ctrl+C to stop both processes
    signal.signal(signal.SIGINT, handle_sigint)
    if hasattr(signal, "SIGTERM"):
        signal.signal(signal.SIGTERM, handle_sigint)

    print("Starting backend: uvicorn app.main:app on http://localhost:4000 ...")
    backend = subprocess.Popen(
        backend_cmd,
        cwd=str(project_root),
    )
    processes.append(backend)

    print("Starting frontend: pnpm dev (Vite) in ./frontend ...")
    frontend = subprocess.Popen(
        frontend_cmd,
        cwd=str(project_root / "frontend"),
    )
    processes.append(frontend)

    # Wait until any exits, then wait for the other or handle Ctrl+C
    exit_code = 0
    try:
        while True:
            alive = [p for p in processes if p.poll() is None]
            if not alive:
                break
            time.sleep(0.3)
    except KeyboardInterrupt:
        pass
    finally:
        # If one exited, capture a non-zero code if present
        for p in processes:
            code = p.poll()
            if code is not None and code != 0:
                exit_code = code
        terminate_all()

    return int(exit_code)


if __name__ == "__main__":
    raise SystemExit(main())


