export default function Register() {
  return (
    <div className="flex flex-col items-center prose relative left-1/2 -translate-x-1/2 top-1/4 -translate-y-1/2">
      <h1>Sign up</h1>
      <div className="relative card bg-neutral text-neutral-content w-96 border border-neutral-content">
        <div className="card-body items-center text-center">
          <p>
            Already have an account?{" "}
            <a href="/login" className="no-underline text-accent">
              Login{" "}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
