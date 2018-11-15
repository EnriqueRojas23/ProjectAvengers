using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using CargaClic.Data.Contracts.Parameters.Seguridad;
using CargaClic.Data.Contracts.Results.Seguridad;
using Common.QueryContracts;
using Common.QueryHandlers;
using Dapper;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Handlers.Query
{
    public class ListarUsuarios : IQueryHandler<ListarUsuariosParameters>
    {
        private readonly IConfiguration _config;
        public ListarUsuarios(IConfiguration config)
        {
            _config = config;
        }
        public async Task<QueryResult> Execute(ListarUsuariosParameters parameters)
        {
             using (var con = new ConnectionFactory(_config).GetOpenConnection())
            {
                var parametros = new DynamicParameters();
                parametros.Add("idtipoproducto", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.Id);
                parametros.Add("idnivelreparacion", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.IdUsuario);
                parametros.Add("idpartner", dbType: DbType.Int64, direction: ParameterDirection.Input, value: parameters.Username);

                var resultado = new ListarUsuariosResult();
                resultado.Hits = await con.QueryAsync<ListarUsuariosDto>(
                        "agendamiento.pa_calculartarifa",
                        parametros,
                        commandType: CommandType.StoredProcedure);

                return resultado;
            }
        }
    }
}