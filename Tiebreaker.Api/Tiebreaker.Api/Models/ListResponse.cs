using System.Collections.Generic;

namespace Tiebreaker.Api.Models
{
    public class ListResponse<T>
    {
        public List<T> Items { get; set; } = new List<T>();

        public int Count { get; set; } = 0;
    }
}
