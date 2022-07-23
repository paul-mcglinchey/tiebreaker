using System.ComponentModel.DataAnnotations;

namespace Tiebreaker.Api.Extensions.Options
{
    public class AppConfigOptions
    {
        internal AppConfigOptions()
        {
        }

        [Required]
        public string ConnectionString { get; set; }

        [Required]
        public string EnvironmentName { get; set; }
    }
}
