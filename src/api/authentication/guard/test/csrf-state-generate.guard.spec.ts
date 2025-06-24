// import { ExecutionContext } from '@nestjs/common';
// import { Request } from 'express';
// import { CsrfStateGenerateGuard } from '../csrf-state-generate.guard';

// describe('CsrfStateGenerateGuard', () => {
//   let guard: CsrfStateGenerateGuard;
//   let context: ExecutionContext;

//   beforeEach(() => {
//     guard = new CsrfStateGenerateGuard();
//     context = {
//       switchToHttp: jest.fn().mockReturnValue({
//         getRequest: jest.fn().mockReturnValue({
//           session: {},
//         }),
//       }),
//     } as unknown as ExecutionContext;
//   });

//   it('should be defined', () => {
//     expect(guard).toBeDefined();
//   });

//   it('should generate a CSRF state and store it in the session', () => {
//     const requestMock = {
//       session: {},
//     } as unknown as Request;
//     context.switchToHttp().getRequest = jest.fn().mockReturnValue(requestMock);

//     guard.canActivate(context);

//     expect(requestMock.session.state).toBeDefined();
//     expect(typeof requestMock.session.state).toBe('string');
//   });
// });
