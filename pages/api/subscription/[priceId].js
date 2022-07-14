import { supabase } from "../../../utils/supabase";
import cookie from 'cookie';

const handler = async (req, res) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);

  if (!user) {
    return res.status(401).send('Unauthorized')
  }

  const token = cookie.parse(req.headers.cookie)['sb-access-token'];

  supabase.auth.session = () => ({
    access_token: token,
    token_type: 'Bearer',
    user
  })

  const { data: { stripe_customer } } = await supabase.from('profile').select('stripe_customer').eq('id', user.id).single();
  

  return res.send({
    ...user,
    stripe_customer
  })
}

export default handler;