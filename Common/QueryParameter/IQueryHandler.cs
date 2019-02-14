using System.Threading.Tasks;
using Common.QueryContracts;

namespace Common.QueryHandlers
{
    public interface IQueryHandler<in T> where T : QueryParameter
    {
       // Task<QueryResult> ExecuteAsync(T parameters);
       QueryResult Execute(T parameters);
    }
}
