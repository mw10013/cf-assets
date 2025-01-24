import type { FC, PropsWithChildren } from 'hono/jsx'
import { Hono } from 'hono'

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
			<h1>Hello Hono!</h1>
			<ul>
				{props.messages.map((message) => {
					return <li>{message}!!</li>
				})}
			</ul>
		</Layout>
	)
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const app = new Hono()
		app.get('/message', (c) => c.text('Hello, World!'))
		app.get('/random', (c) => c.text(crypto.randomUUID()))
		app.get('/hono', (c) => {
			const messages = ['Good Morning', 'Good Evening', 'Good Night']
			return c.html(<Top messages={messages} />)
		})

		return app.fetch(request, env, ctx)
	},
} satisfies ExportedHandler<Env>
