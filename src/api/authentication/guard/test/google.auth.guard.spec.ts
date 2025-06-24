// import { ExecutionContext } from '@nestjs/common';
// import { Request } from 'express';
// import { GoogleAuthGuard } from '../google.auth.guard';

// describe('GoogleAuthGuard', () => {
//   let guard: GoogleAuthGuard;

//   beforeEach(() => {
//     guard = new GoogleAuthGuard();
//   });

//   it('should be defined', () => {
//     expect(guard).toBeDefined();
//   });

//   describe('getAuthenticateOptions', () => {
//     it('should return the state from the request session', () => {
//       const mockRequest = {
//         session: {
//           state: 'mockState',
//         },
//       } as unknown as Request;

//       const mockContext = {
//         switchToHttp: () => ({
//           getRequest: () => mockRequest,
//         }),
//       } as unknown as ExecutionContext;

//       const options = guard.getAuthenticateOptions(mockContext);

//       expect(options).toEqual({ state: 'mockState' });
//     });
//   });
// });
