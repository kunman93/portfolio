import { Shallow } from "shallow-render";
import { NotificationModule } from "../notification.module";
import { ToastService } from "./toast.service";
import { ToastData } from "../models/toast-data";
import { ToastType } from "../models/toast-type";

describe('ToastService', () => {
    let shallow: Shallow<ToastService>;

    beforeEach(() => {
        shallow = new Shallow(ToastService, NotificationModule);
    });

    describe('add', async () => {
        it('adds a toastData if there are no ToastDatas', async () => {
            // arrange
            const { instance } = shallow.createService();

            const toastData: ToastData = {
                type: ToastType.SUCCESS,
                message: 'Your message has been sent.'
            };

            // act
            instance.add(toastData);

            // assert
            expect(instance.getToastDatas()).toEqual([toastData]);
        });

        it('updates the toastData', () => {
            // arrange
            const { instance } = shallow.createService();

            const oldToastData: ToastData = {
                type: ToastType.SUCCESS,
                message: 'Your message has been sent.'
            };

            const newToastData: ToastData = {
                type: ToastType.ERROR,
                message: 'Something went wrong.'
            };

            // act
            instance.add(oldToastData);
            instance.add(newToastData);

            // assert
            expect(instance.getToastDatas()).toEqual([newToastData]);
        });
    });

    describe('remove', () => {
        it('removes the toastData', () => {
            // arrange
            const { instance } = shallow.createService();
            const toastData: ToastData = {
                type: ToastType.SUCCESS,
                message: 'Your message has been sent.'
            };
            instance.add(toastData);

            // act
            instance.remove(0);

            // assert
            expect(instance.getToastDatas()).toHaveSize(0);
        });
    });

    describe('getToastDatas', () => {
        it('gets the toastDatas', async () => {
            // arrange
            const { instance } = shallow.createService();

            const toastData: ToastData = {
                type: ToastType.SUCCESS,
                message: 'Your message has been sent.'
            };

            // act
            instance.add(toastData);

            // assert
            expect(instance.getToastDatas()).toEqual([toastData]);
        });
    });
});