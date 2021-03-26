const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	scalar Date
	
	type Query {
		ola: String
		horaAtual: Date
	}
`

const resolvers = {
	Query: {
		ola() {
			return 'Basta retornar uma string.';
		},
		horaAtual() {
			return `${new Date}`;
		}
	}
}

const server = new ApolloServer({
	typeDefs,
	resolvers
});

server.listen().then(({ url }) => {
	console.log(`Executando em ${url}`);
});