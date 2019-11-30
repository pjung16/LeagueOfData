run_local: run_local_backend run_local_frontend

run_local_backend:
	cd backend; make run_local;

run_local_frontend:
	cd frontend; make run_local;