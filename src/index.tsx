import type { FC } from 'hono/jsx'
import { Hono } from 'hono'

const Layout: FC = (props) => {
	return (
		<html>
			<body>{props.children}</body>
		</html>
	)
}

const Top: FC<{ messages: string[] }> = (props: { messages: string[] }) => {
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
		app.get('/top', (c) => {
			const messages = ['Good Morning', 'Good Evening', 'Good Night']
			return c.html(<Top messages={messages} />)
		})

		return app.fetch(request, env, ctx)
	},
} satisfies ExportedHandler<Env>
