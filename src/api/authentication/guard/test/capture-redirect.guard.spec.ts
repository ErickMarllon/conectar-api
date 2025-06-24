// import { ExecutionContext } from '@nestjs/common';
// import { Request } from 'express';
// import { CaptureRedirectGuard } from '../capture-redirect.guard';

// describe('CaptureRedirectGuard', () => {
//   let guard: CaptureRedirectGuard;
//   let context: ExecutionContext;

//   beforeEach(() => {
//     guard = new CaptureRedirectGuard();
//     context = {
//       switchToHttp: jest.fn().mockReturnValue({
//         getRequest: jest.fn().mockReturnValue({
//           query: { redirect: '/mock-redirect' },
//           session: {},
//         }),
//       }),
//     } as unknown as ExecutionContext;
//   });

//   it('should be defined', () => {
//     expect(guard).toBeDefined();
//   });

//   it('should set redirectUrl in session when redirect query parameter is present', () => {
//     const requestMock = {
//       query: { redirect: '/mock-redirect' },
//       session: {},
//     } as unknown as Request;
//     context.switchToHttp().getRequest = jest.fn().mockReturnValue(requestMock);

//     guard.canActivate(context);

//     expect(requestMock.session.redirectUrl).toBe('/mock-redirect');
//   });

//   it('should set redirectUrl to "/" in session when redirect query parameter is not present', () => {
//     const requestMock = {
//       query: {},
//       session: {},
//     } as unknown as Request;
//     context.switchToHttp().getRequest = jest.fn().mockReturnValue(requestMock);

//     guard.canActivate(context);

//     expect(requestMock.session.redirectUrl).toBe('/');
//   });
// });
