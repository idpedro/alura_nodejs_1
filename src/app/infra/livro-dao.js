class LivroDao{
    constructor(db){
        this._db = db;
    }
    adiciona(livro){
        return new Promise((resolve,reject)=>{
            this._db.run(`
                INSERT INTO livros (
                    titulo,
                    preco,
                    descricao
                ) values (?,?,?)`
            ,
            [
                livro.titulo,
                livro.preco,
                livro.descricao
            ],
            (err)=>{ 
                if (err){
                    console.log(err)
                    return reject('Não foi possivel inserir o Livro!');
                };
                return resolve();
            }
        )
        })
    }

    lista(){
        return new Promise((resolve,reject)=>{
            this._db.all('SELECT * FROM livros', (erro,resultado)=>{
                if(erro) return reject('Não foi posivel lista os livros!');
                return resolve(resultado);
            })
        })
    }

    buscarPorId(id){
        return new Promise((resolve,reject)=>{
            const query = 'SELECT * FROM livros where id=?'
            this._db.get(query,id,(err,livro)=>{
                if (err) return reject('Livro não encontrado');
                return resolve(livro);
            })
        })
    }

    atualizar(livro){
        return new Promise((resolve,reject)=>{
            this._db.run(`
                UPDATE livros SET
                titulo = ?, 
                preco = ?,
                descricao = ?
                WHERE id=?`
            ,
            [
                livro.titulo,
                livro.preco,
                livro.descricao,
                livro.id
            ],
            (err)=>{ 
                if (err){
                    console.log(err)
                    return reject('Não foi possivel Alterar o Livro!');
                };
                return resolve();
            }
        )
        })
    }

    remover(id){
        return new Promise((resolve,reject)=>{
            const query='DELETE FROM livros WHERE id=?';
            this._db.run(query,id,(err)=>{
                if (err) return reject('Não foi possivel remover o livro'); 
                return resolve();
            })
        })
    }
}

module.exports = LivroDao;