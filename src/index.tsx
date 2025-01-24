import type { FC, PropsWithChildren } from 'hono/jsx'
import { Hono } from 'hono'
import { jsxRenderer, useRequestContext } from 'hono/jsx-renderer'

const Layout: FC<PropsWithChildren<{}>> = (props) => {
	return (
		<html>
			<head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link href="./tailwind.css" rel="stylesheet" />
				<title>Hono</title>
			</head>
			<body>{props.children}</body>
		</html>
	)
}

const Top: FC<{ messages: string[] }> = (props) => {
	return (
		<Layout>
			<div className="container prose p-6 lg:prose-xl dark:prose-invert">
				<h1>Hello Hono!</h1>
				<ul>
					{props.messages.map((message) => {
						return <li>{message}!!</li>
					})}
				</ul>
			</div>
		</Layout>
	)
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const app = new Hono()
		app.get('/message', (c) => c.text('Hello, World!'))
		app.get('/random', (c) => c.text(crypto.randomUUID()))
		app.get(
			'/hono/*',
			jsxRenderer(({ children }) => {
				return (
					<html>
						<head>
							<meta charset="UTF-8" />
							<meta name="viewport" content="width=device-width, initial-scale=1.0" />
							<link href="./tailwind.css" rel="stylesheet" />
							<title>Hono JSX</title>
						</head>
						<body>{children}</body>
					</html>
				)
			}),
		)

		app.get('/hono', (c) => {
			const messages = ['Good Morning', 'Good Evening', 'Good Night']
			return c.render(<Top messages={messages} />)
		})

		return app.fetch(request, env, ctx)
	},
} satisfies ExportedHandler<Env>
