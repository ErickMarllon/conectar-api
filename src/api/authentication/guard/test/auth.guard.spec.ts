// import { UnauthorizedException } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Test, TestingModule } from '@nestjs/testing';
// import { User } from '../../../entities/user.entity';
// import { UserPayload } from '../../../users/user';
// import { UsersService } from '../../../users/users.service';
// import { AuthGuard } from '../auth.guard';

// describe('AuthGuard', () => {
//   let guard: AuthGuard;
//   let jwtService: JwtService;
//   let usersService: UsersService;

//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       providers: [
//         AuthGuard,
//         {
//           provide: JwtService,
//           useValue: {
//             verifyAsync: jest.fn(),
//           },
//         },
//         {
//           provide: UsersService,
//           useValue: {
//             findByID: jest.fn(),
//           },
//         },
//       ],
//     }).compile();

//     guard = module.get<AuthGuard>(AuthGuard);
//     jwtService = module.get<JwtService>(JwtService);
//     usersService = module.get<UsersService>(UsersService);
//   });

//   it('should be defined', () => {
//     expect(guard).toBeDefined();
//   });

//   describe('canActivate', () => {
//     it('should return true if token is valid and user exists', async () => {
//       const mockRequest = {
//         headers: {
//           authorization: 'Bearer valid_token',
//         },
//         user: null,
//       };
//       const mockPayload: UserPayload = { id: 0, email: 'jhon@gmail.com' };
//       const mockUser: User = {
//         id: 0,
//         email: 'jhon@gmail.com',
//         first_name: 'Jhon',
//         last_name: 'Doe',
//         picture: 'picture',
//         created_at: new Date(),
//         updated_at: new Date(),
//         auth: null,
//       };

//       jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockPayload);
//       jest.spyOn(usersService, 'findByID').mockResolvedValue(mockUser);

//       const result = await guard.canActivate({
//         switchToHttp: () => ({
//           getRequest: () => mockRequest,
//         }),
//       } as any);

//       expect(result).toBe(true);
//       expect(mockRequest.user).toBe(mockUser);
//     });

//     it('should throw UnauthorizedException if token is missing', async () => {
//       const mockRequest = {
//         headers: {},
//       };

//       await expect(
//         guard.canActivate({
//           switchToHttp: () => ({
//             getRequest: () => mockRequest,
//           }),
//         } as any),
//       ).rejects.toThrow(UnauthorizedException);
//     });

//     it('should throw UnauthorizedException if token is invalid', async () => {
//       const mockRequest = {
//         headers: {
//           authorization: 'Bearer invalid_token',
//         },
//       };

//       jest.spyOn(jwtService, 'verifyAsync').mockRejectedValue(new Error());

//       await expect(
//         guard.canActivate({
//           switchToHttp: () => ({
//             getRequest: () => mockRequest,
//           }),
//         } as any),
//       ).rejects.toThrow(UnauthorizedException);
//     });

//     it('should throw UnauthorizedException if user does not exist', async () => {
//       const mockRequest = {
//         headers: {
//           authorization: 'Bearer valid_token',
//         },
//       };
//       const mockPayload: UserPayload = { id: 0, email: 'jhon@gmail.com' };

//       jest.spyOn(jwtService, 'verifyAsync').mockResolvedValue(mockPayload);
//       jest.spyOn(usersService, 'findByID').mockResolvedValue(null);

//       await expect(
//         guard.canActivate({
//           switchToHttp: () => ({
//             getRequest: () => mockRequest,
//           }),
//         } as any),
//       ).rejects.toThrow(UnauthorizedException);
//     });
//   });

//   describe('extractTokenFromHeader', () => {
//     it('should return the token if authorization header is valid', () => {
//       const mockRequest = {
//         headers: {
//           authorization: 'Bearer valid_token',
//         },
//       };

//       const result = guard['extractTokenFromHeader'](mockRequest as any);

//       expect(result).toBe('valid_token');
//     });

//     it('should return undefined if authorization header is missing', () => {
//       const mockRequest = {
//         headers: {},
//       };

//       const result = guard['extractTokenFromHeader'](mockRequest as any);

//       expect(result).toBeUndefined();
//     });

//     it('should return undefined if authorization header is not in Bearer format', () => {
//       const mockRequest = {
//         headers: {
//           authorization: 'Invalid valid_token',
//         },
//       };

//       const result = guard['extractTokenFromHeader'](mockRequest as any);

//       expect(result).toBeUndefined();
//     });
//   });
// });
