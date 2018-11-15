using System.Threading.Tasks;
using Common.QueryContracts;

namespace Common.QueryHandlers
{
    public interface IQueryHandler<in T> where T : QueryParameter
    {
       Task<QueryResult> Execute(T parameters);
    }
}
