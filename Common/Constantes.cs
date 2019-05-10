namespace CargaClic.Common
{
    public sealed class Constantes
    {
        public enum EstadoOrdenIngreso : int
        {
            Planeado = 4,
            Asignado = 5,
            Recibiendo = 6,
            PendienteAcomodo = 19,
            PendienteAlmacenamiento = 20,
            Terminado = 12,

        }
        public enum EstadoEquipoTransporte : int
        {
            EnProceso = 13,
            EnCola = 14,
            EnDescarga = 15,
            Cerrado = 16,
        }
    }
}