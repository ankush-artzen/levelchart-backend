import { Request, Response } from 'express';
import StoreIntegration from '../models/storeIntegration';
import myCache from '../utils/cache';

export const integrationAdd = async (req: Request, res: Response): Promise<void> => {
    const cachedShop = myCache.get<string>('shop');
    const shop = req.session.shop || cachedShop;
    console.log('Shop from cache:', req.oidc.user, cachedShop, shop);

    if (!req.oidc.isAuthenticated()) {
        return res.render('index', {
            shop: shop,
            title: 'Level Chart Auth0 Integration',
            isAuthenticated: false
        });
    }

    const user: any = req.oidc.user;

    if (user && !shop) {
        const dbUser = await StoreIntegration.findOne({ auth0Id: user.sub })
        return res.render('index', {
            shop: dbUser?.shop || null,
            title: 'Level Chart Auth0 Integration',
            isAuthenticated: req.oidc.isAuthenticated()
        });
    }

    if (!user && !shop) {
        return res.render('index', {
            shop: null,
            title: 'Level Chart Auth0 Integration',
            isAuthenticated: req.oidc.isAuthenticated()
        });
    }

    const {
        sub: auth0Id,
        sid,
        nickname,
        name,
        email,
        email_verified: emailVerified,
        picture,
    } = user;

    try {
        // Upsert user
        const dbUser = await StoreIntegration.findOneAndUpdate(
            { auth0Id },
            {
                $set: {
                    sid,
                    nickname,
                    name,
                    email,
                    emailVerified,
                    picture,
                    shop
                },
            },
            { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        console.log('User stored/updated:', dbUser);
        res.render('index', {
            shop: shop,
            title: 'Auth0 Integration',
            isAuthenticated: req.oidc.isAuthenticated()
        });
    } catch (err) {
        console.error('MongoDB error:', err);
        res.status(500).send('Database error');
    }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
    const cachedShop = req.session.shop || myCache.get<string>('shop');

    req.session.destroy(async (err) => {
        if (err) {
            console.log('Error destroying session:', err);
            return res.status(500).send('Logout failed');
        }

        myCache.del('shop');

        if (cachedShop) {
            try {
                await StoreIntegration.findOneAndDelete({ shop: cachedShop });
            } catch (dbErr) {
                console.log('Error deleting from DB:', dbErr);
            }
        }

        return res.redirect('/logout');
    });
};

export const integrationProfile = async (req: Request, res: Response): Promise<void> => {
    console.log('User profile:', req.oidc.user);
    const cachedShop = myCache.get<string>('shop');
    const shop = req.session.shop || cachedShop;
    res.render('profile', {
        shop: shop,
        isAuthenticated: req.oidc.isAuthenticated(),
        userProfile: JSON.stringify(req.oidc.user, null, 2),
        title: 'Profile page'
    });
};

export const integration = async (req: Request, res: Response): Promise<void> => {
    const shopParam = req.query.shop;

    if (typeof shopParam !== 'string') {
        res.status(400).send({ ok: false, message: 'Invalid or missing shop parameter' });
        return
    }

    myCache.set('shop', shopParam);
    req.session.shop = shopParam;

    if (!req.oidc.isAuthenticated()) {
        return res.redirect('/login');
    }
    // const user: any = req.oidc.user;
    return res.redirect('/');
}
