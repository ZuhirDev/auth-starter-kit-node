import React, { useState } from 'react';
import { Check, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useAuth } from '@auth/context/AuthContext';
import { QRCodeSVG } from 'qrcode.react';
import { Skeleton } from '@/components/ui/skeleton';
import { useTranslation } from 'react-i18next';
import PasswordVerification from '../PasswordVerification';
import useModal from '@/hooks/useModal';
import { toast } from 'sonner';
import Verify2FA from './Verify2FA';

const Enable2FA = () => {

    const { t } = useTranslation();
    const { isOpen, open, close } = useModal();
    const { isOpen: verify, open: openVerify, close: hideVerify } = useModal();
    const { enable2FA } = useAuth();
    const [qrCodeURL, setQrCodeURL] = useState(null);
    const [secret, setSecret] = useState(null);
    const [copied, setCopied] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const copyToClipboard = async (secret) => {
        await navigator.clipboard.writeText(secret);
        setCopied(true);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleEnable2FA = async (data) => {
        try {
            close();
            const response = await enable2FA(data);
            
            setQrCodeURL(response.qr_url);
            setSecret(response.secret);
            setIsEnabled(true); 
            toast.success(response.message);
        } catch (error) {
            console.log("Error", error);
            toast.error(error?.response?.data?.message);
        }
    };

    const handleClose = () => {
        setIsEnabled(false);
        openVerify();
    };

    return (
        <>
            <Button onClick={open}>
                Enable 2FA                    
            </Button>

            <Dialog open={isEnabled}>

                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle>Enable Verification 2FA</DialogTitle>
                        <DialogDescription>
                            Scan or copy this code to enable it
                        </DialogDescription>
                    </DialogHeader>

                    {isEnabled ? (
                        <div>
                            <div className="flex justify-center items-center p-4 rounded-lg">
                                {qrCodeURL && <QRCodeSVG value={qrCodeURL} size={256} />}
                            </div>

                            <div className="mt-4">
                                <div className="flex items-center space-x-2">
                                    <div className="grid flex-1 gap-2">
                                        <Label htmlFor="link" className="sr-only">
                                            Link
                                        </Label>
                                        <Input
                                            id="link"
                                            value={secret}
                                            readOnly
                                        />
                                    </div>

                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => copyToClipboard(secret, 'secret')}
                                        className="rounded hover:bg-muted"
                                    >
                                        {copied ? (
                                        <Check className="" size={18} />
                                        ) : (
                                        <Copy className="text-muted-foreground hover:text-foreground" size={18} />
                                        )}
                                    </Button>                                    
 
                                </div>
                            </div>

                            <DialogFooter className="sm:justify-start mt-4">
                                <DialogClose asChild>
                                    <Button onClick={handleClose} type="button" variant="secondary">
                                        Close
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <Skeleton className="w-64 h-64 rounded-md mx-auto" />
                    
                            <Skeleton className="h-10 w-full rounded-md" />
                    
                            <div className="flex justify-start">
                                <Skeleton className="h-10 w-20 rounded-md" />
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            <PasswordVerification 
                isOpen={isOpen}
                onClose={close}
                onVerify={handleEnable2FA}
            />

            {verify && (<Verify2FA />)}
        </>
    );
};

export default Enable2FA;
