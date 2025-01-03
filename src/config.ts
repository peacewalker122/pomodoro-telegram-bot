interface Config {
	telegram: {
		token: string;
	};
	server: {
		port: number;
	};
}

function validateConfig(): Config {
	if (!process.env.TELEGRAM_KEY) {
		throw new Error("TELEGRAM_KEY environment variable is not set");
	}

	return {
		telegram: {
			token: process.env.TELEGRAM_KEY,
		},
		server: {
			port: Number(process.env.PORT) || 3000,
		},
	};
}

export const config = validateConfig();
