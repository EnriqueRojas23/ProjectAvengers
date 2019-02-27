using System.Data.SqlClient;
using Microsoft.Extensions.Configuration;

namespace CargaClic.Handlers
{
    public class ConnectionFactory
    {
        private readonly IConfiguration _config;

        public ConnectionFactory(IConfiguration config) {
        _config = config;
        }

        public SqlConnection GetOpenConnection() {
        //string cs = config["Data:DefaultConnection:ConnectionString"];
        var cs =  _config.GetConnectionString("DefaultConnection");
        var connection = new SqlConnection(cs);
        connection.Open();
        return connection;
        }
    }
}