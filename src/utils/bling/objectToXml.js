import Parser from 'xml2js';

export default class sasd {
  constructor(data) {
    this.data = data;
  }

  async xmlModel() {
    const builder = new Parser.Builder();
    const arrayXml = [];

    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      // eslint-disable-next-line no-restricted-syntax
      for await (const obj of this.data) {
        const {
          // eslint-disable-next-line camelcase
          official_document, title, value, won_time,
        } = obj;
        const xmlobj = {
          pedido: {
            cliente: {
              nome: title,
              tipoPessoa: 'J',
              endereco: 'Rua Visconde de São Gabriel',
              cpf_cnpj: official_document,
              ie_rg: '3067663000',
              numero: '392',
              complemento: 'Sala 54',
              bairro: 'Cidade Alta',
              cep: '95.700-000',
              cidade: 'Bento Gonçalves',
              uf: 'RS',
              fone: '5481153376',
              email: 'teste@teste.com.br',
            },
            transporte: {
              transportadora: 'Transportadora XYZ',
              tipo_frete: 'R',
              servico_correios: 'SEDEX - CONTRATO',
              dados_etiqueta: {
                nome: 'Endereço de entrega',
                endereco: 'Rua Visconde de São Gabriel',
                numero: '392',
                complemento: 'Sala 59',
                municipio: 'Bento Gonçalves',
                uf: 'RS',
                cep: '95.700-000',
                bairro: 'Cidade Alta',
              },
              volumes: {
                volumes: [
                  {
                    servico: 'SEDEX - CONTRATO',
                    codigoRastreamento: '',
                  },
                  {
                    servico: 'PAC - CONTRATO',
                    codigoRastreamento: '',
                  },
                ],
              },
            },
            itens: {
              item: [
                {
                  codigo: '001',
                  descricao: 'Caneta 001',
                  un: 'Pç',
                  qtde: '10',
                  vlr_unit: '1.68',
                },
                {
                  codigo: '002',
                  descricao: 'Caderno 002',
                  un: 'Un',
                  qtde: '3',
                  vlr_unit: '3.75',
                },
                {
                  codigo: '003',
                  descricao: 'Teclado 003',
                  un: 'Cx',
                  qtde: '7',
                  vlr_unit: '18.65',
                },
              ],
            },
            parcelas: {
              parcela: [
                {
                  data: won_time,
                  vlr: value,
                  obs: 'Teste obs 1',
                },

              ],
            },
            vlr_frete: '15',
            vlr_desconto: '10',
            obs: 'Testando o campo observações do pedido',
            obs_internas: 'Testando o campo observações internas do pedido',
          },
        };
        const xmldata = builder.buildObject(xmlobj);
        arrayXml.push(encodeURI(xmldata));
      }
      resolve(arrayXml);
    });
  }
}
