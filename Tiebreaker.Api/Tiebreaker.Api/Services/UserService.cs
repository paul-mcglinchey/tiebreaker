using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Tiebreaker.Api.Cryptography;
using Tiebreaker.Api.Models;
using Tiebreaker.Api.Services.Interfaces;
using Tiebreaker.Data;
using Tiebreaker.Domain.Models;

namespace Tiebreaker.Api.Services
{
    public class UserService : IUserService
    {
        private HashingManager hashing = new();

        private TiebreakerContext context;
        private IMapper mapper;
        private IConfiguration configuration;

        public UserService(TiebreakerContext context, IMapper mapper, IConfiguration configuration)
        {
            this.context = context;
            this.mapper = mapper;
            this.configuration = configuration;
        }

        public async Task<bool> UserExistsAsync(UserRequest user, CancellationToken cancellationToken) =>
            await this.context.Users.Where(u => 
                u.Username.Equals(user.Username) || 
                u.Email.Equals(user.Email) || 
                (u.Username.Equals(user.UsernameOrEmail) || u.Email.Equals(user.UsernameOrEmail)))
            .SingleOrDefaultAsync(cancellationToken) != null;

        public async Task<UserDto> GetUserByIdAsync(Guid userId, CancellationToken cancellationToken)
        {
            var user = await this.context.Users.Where(u => u.Id == userId).FirstOrDefaultAsync(cancellationToken);
            var mappedUser = this.mapper.Map<User, UserDto>(user);
            mappedUser.Token = GenerateToken(user);

            return mappedUser;
        }

        public async Task<User> GetUserByUsernameOrEmailAsync(string usernameOrEmail, CancellationToken cancellationToken) =>
            await this.context.Users.Where(u => u.Username == usernameOrEmail || u.Email == usernameOrEmail).SingleOrDefaultAsync(cancellationToken);

        public async Task<UserDto> CreateUserAsync(UserRequest userRequest, CancellationToken cancellationToken)
        {
            var user = new User
            {
                Username = userRequest.Username,
                Email = userRequest.Email,
                Password = hashing.HashToString(userRequest.Password),
            };

            await this.context.Users.AddAsync(user, cancellationToken);
            await this.context.SaveChangesAsync(cancellationToken);
            
            return await this.GetUserByIdAsync(user.Id, cancellationToken);
        }

        public async Task<UserDto?> AuthenticateUserAsync(UserRequest userRequest, CancellationToken cancellationToken)
        {
            var user = await this.GetUserByUsernameOrEmailAsync(userRequest.UsernameOrEmail, cancellationToken);

            return hashing.Verify(userRequest.Password, user.Password)
                ? await this.GetUserByIdAsync(user.Id, cancellationToken)
                : null;
        }

        private string GenerateToken(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.configuration["JwtPrivateKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var secToken = new JwtSecurityToken(
                issuer: "tiebreaker",
                audience: "tiebreaker",
                signingCredentials: credentials,
                claims: new[]
                {
                    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Email, user.Email)
                },
                expires: DateTime.UtcNow.AddDays(14));

            return new JwtSecurityTokenHandler().WriteToken(secToken);
        }
    }
}
