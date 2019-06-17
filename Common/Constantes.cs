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
        
        public enum EstadoOrdenSalida : int
        {
            Creado = 21,
            Planificado = 22,
            Asignado = 23,
            Despachado = 24,
        }
        public enum EstadoCarga : int
        {
            Pendiente = 25,
            Confirmado = 26,
            Despachado = 27,
        }
        public enum EstadoEquipoTransporte : int
        {
            EnProceso = 13,
            Asignado = 14,
            EnDescarga = 15,
            Cerrado = 16,
        }
        public enum EstadoInventario : int
        {
            Disponible = 7,
            NoDisponible = 8,
            Merma = 18,
            Eliminado = 21
        }
    }
}