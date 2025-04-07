import * as Sentry from '@sentry/react';
import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import NavigationBar from './components/AppBar';
import ConsumerPage from './pages/ConsumerPage';
import HomePage from './pages/HomePage';
import NotFound from './pages/NotFound';
import ProductPage from './pages/ProductPage';
import SalePage from './pages/SalePage';

Sentry.init({
	dsn: 'https://253a69ce3748706d0455c88fe71ce8e3@o292592.ingest.us.sentry.io/4508608407928832',
	integrations: [
		Sentry.browserTracingIntegration(),
		Sentry.replayIntegration(),
	],
	tracesSampleRate: 1.0,
	tracePropagationTargets: ["localhost", /^https:\/\/yourserver\.io\/api/],
	replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
});

const App = () => (
	<Sentry.ErrorBoundary fallback={<p>An error occurred.</p>}>
		<Router>
			<NavigationBar />
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/consumer" element={<ConsumerPage />} />
				<Route path="/product" element={<ProductPage/>} />
				<Route path="/sale" element={<SalePage/>} />
				<Route path="*" element={<NotFound />} />
			</Routes>
		</Router>
	</Sentry.ErrorBoundary>
);

export default App;