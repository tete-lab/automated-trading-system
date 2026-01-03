export default function LoginPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-md">
        <div className="rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="mb-6 text-2xl font-bold text-foreground">로그인</h1>
          <form className="space-y-4">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                이메일
              </label>
              <input
                type="email"
                id="email"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                placeholder="example@email.com"
              />
            </div>
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-foreground">
                비밀번호
              </label>
              <input
                type="password"
                id="password"
                className="w-full rounded-lg border border-input bg-background px-4 py-2.5 text-foreground placeholder:text-muted-foreground focus:border-ring focus:outline-none focus:ring-2 focus:ring-ring/20"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-lg bg-primary py-2.5 font-medium text-primary-foreground hover:opacity-90 transition-opacity"
            >
              로그인
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
