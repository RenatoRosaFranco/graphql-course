const { ApolloServer, gql } = require('apollo-server');

const typeDefs = gql`
	scalar Date

	type Usuario {
		id: ID!
		nome: String!
		email: String!
		idade: Int
		salario: Float
		vip: Boolean
	}

	type Produto {
		nome: String!
		preco: Float!
		desconto: Int
	}

	type Query {
		id: Int
		ola: String
		horaAtual: Date
		usuarioLogado: Usuario
		produtoEmDestaque: Produto
	}
`

const resolvers = {
	Usuario: {
		salario(usuario) {
			return usuario.salario_real;
		}
	},
	Produto: {
		desconto(produto) {
			return produto.preco - produto.desconto;
		}
	},
	Query: {
		id() {
			return Math.floor(Math.random() * 100);
		},
		ola() {
			return 'Basta retornar uma string.';
		},
		horaAtual() {
			return `${new Date}`;
		},
		usuarioLogado() {
			return {
				id: Math.floor(Math.random() * 100),
				nome: 'Ana da Web',
				email: 'anadaweb@email.com',
				idade: 23,
				salario_real: 1234.56,
				vip: true
			}
		},
		produtoEmDestaque() {
			return {
				nome: 'Livro GraphQL',
				preco: 100,
				desconto: 1
			}
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