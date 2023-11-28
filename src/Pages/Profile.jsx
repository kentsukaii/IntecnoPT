import { Container } from 'react-bootstrap';

const Profile = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    // Limpar a assinatura quando o componente é desmontado
    return () => unsubscribe();
  }, [auth]);

  return (
    <Container>
      <div>YOUR DIV HERE</div>
      <h1>Bem-vindo à página inicial!</h1>
      <h5>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus, aut quibusdam esse modi praesentium veniam consequuntur sunt, inventore blanditiis laudantium voluptatum, odit ab molestiae deserunt omnis assumenda quasi voluptatem quod? Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi illo officiis maxime, labore odit necessitatibus quod consectetur ipsa excepturi magni eius tenetur laboriosam ea impedit! Officiis, est. Nihil, rem temporibus! Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum amet ut iste impedit saepe. Ipsam at nostrum deserunt ullam commodi eum voluptatem repellendus minus dignissimos, excepturi facere. Laboriosam, ipsa. Architecto. Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore similique aperiam, laboriosam harum praesentium sequi vel dicta ullam doloremque iure molestiae possimus quasi deserunt accusantium nihil non tempora corrupti unde. Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio, esse veniam vitae minima tenetur laborum optio maiores eius veritatis asperiores sit corrupti. Pariatur similique expedita laudantium ea doloribus omnis corrupti. lore lore lore Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolor perferendis sequi quae dolores, voluptatum pariatur provident suscipit obcaecati sit facere minima, aperiam quam! Iur</h5>
    </Container>
  );
};


export default Profile;