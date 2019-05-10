using System.Collections.Generic;
using Common.QueryContracts;

namespace CargaClic.Data.Contracts.Results.Seguridad
{
public class TreeviewItemResult : QueryResult 
    {
        public IEnumerable<TreeviewItem> Hits { get; set; }
    }
    public class TreeviewItem
    {
        public int Value {get;set;}
        public string Codigo	{ get;set; }
        public string CodigoPadre	{ get;set; }
        public string Text	{ get;set; }
        public string Link	{ get;set; }
        public string Nivel	{ get;set; }
        public string Orden	{ get;set; }
        public string Icono	{ get;set; }        
        public bool check { get;set; }
        public List<TreeviewItem> children {get;set;}

    } 

    



 
}