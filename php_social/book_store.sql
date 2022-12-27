-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th9 29, 2022 lúc 02:38 PM
-- Phiên bản máy phục vụ: 10.4.24-MariaDB
-- Phiên bản PHP: 8.1.6

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `book_store`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `temp_user`
--

CREATE TABLE `temp_user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(40) DEFAULT NULL,
  `created` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fullname` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(40) DEFAULT NULL,
  `is_admin` tinyint(4) DEFAULT NULL,
  `code_login` varchar(20) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `user`
--

INSERT INTO `user` (`id`, `email`, `password`, `fullname`, `address`, `phone_number`, `is_admin`, `code_login`, `created`, `modified`) VALUES
(1, 'dochu4@gmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', 'Chu Thành Đô', 'Long Bien, Ha Noi, Viet Nam', '0354324599', 1, '', '0000-00-00 00:00:00', '2022-09-23 16:30:02'),
(2, 'dochu8@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'Chu Do', 'Long Bien, Ha Noi, Viet Nam', '0354324599', 0, '', '0000-00-00 00:00:00', '2022-09-11 09:16:03'),
(3, 'dochu12@gmail.com', '40bd001563085fc35165329ea1ff5c5ecbdbbeef', 'Chu Do', 'Long Bien, Ha Noi, Viet Nam', '0354324599', 0, '', '2022-09-11 13:13:11', '0000-00-00 00:00:00'),
(11, 'dochu13@gmail.com', '7110eda4d09e062aa5e4a390b0a572ac0d2c0220', 'Chu Do', 'Long Bien, Ha Noi, Viet Nam', '0354324599', 0, 'xtmrwimy', '2022-09-16 11:28:57', '0000-00-00 00:00:00');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wp_author`
--

CREATE TABLE `wp_author` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `address` varchar(200) DEFAULT NULL,
  `phone` varchar(12) DEFAULT NULL,
  `specialization` text DEFAULT NULL,
  `created` datetime NOT NULL,
  `modified` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `wp_author`
--

INSERT INTO `wp_author` (`id`, `name`, `address`, `phone`, `specialization`, `created`, `modified`) VALUES
(1, 'Chu Do B', 'Long Bien, Ha Noi, Viet Nam', '0354324599', 'Nhà văn Việt Nam viết tiểu thuyết và truyện ngắn.', '2022-09-09 16:59:25', '2022-09-17 09:09:07'),
(2, 'Bảo Ninh', 'Huyện Diễn Châu, tỉnh Nghệ An, quê ở xã Bảo Ninh, huyện Quảng Ninh (nay thuộc thành phố Đồng Hới), tỉnh Quảng Bình, Việt Nam', 'none', 'Nhà văn Việt Nam viết tiểu thuyết và truyện ngắn.', '2022-09-09 17:03:25', '2022-09-09 17:03:25'),
(3, 'Bảo Bình', 'none', 'none', 'Nhà văn Việt Nam viết tiểu thuyết và truyện ngắn.', '2022-09-09 17:04:53', '2022-09-09 17:04:53'),
(4, 'Nguyễn Phương Văn', 'none', 'none', 'Nhà văn Việt Nam viết tiểu thuyết và truyện ngắn.', '2022-09-09 17:05:59', '2022-09-09 17:05:59'),
(5, 'Nguyễn Nhật Ánh', ' Làng Đo Đo, xã Bình Quế, huyện Thăng Bình, tỉnh Quảng Nam', 'none', 'Nhà văn, nhà thơ, bình luận viên Việt Nam. Ông đượ', '2022-09-09 17:07:14', '2022-09-09 17:07:14'),
(6, 'Jack London', 'San Francisco, bang California.', 'none', ' Nhà văn nổi tiếng người Mỹ, tác giả Tiếng gọi nơi', '2022-09-09 17:08:17', '2022-09-09 17:08:17'),
(7, 'Mario Gianluigi Puzo', 'none', 'none', 'Nhà văn, nhà biên kịch người Mỹ, được biết đến với', '2022-09-09 17:09:28', '2022-09-09 17:09:28'),
(8, 'Francis Scott Key Fitzgerald', 'none', 'none', 'none', '2022-09-09 17:10:41', '2022-09-09 17:10:41'),
(9, 'Nguyên Hồng', 'phố Hàng Cau, nay thuộc phường Trần Hưng Đạo, thành phố Nam Định, tỉnh Nam Định', 'none', 'Nhà văn, nhà thơ Việt Nam.', '2022-09-09 17:11:20', '2022-09-09 17:11:20'),
(10, 'Ernest Miller Hemingway', 'Oak Park, Illinois, một vùng ngoại ô của Chicago', 'none', 'none', '2022-09-09 17:11:56', '2022-09-09 17:11:56'),
(11, 'Neil Richard MacKinnon Gaiman', 'UK', 'none', 'English author of short fiction, novels, comic boo', '2022-09-09 17:12:59', '2022-09-09 17:12:59'),
(12, 'Lev Nikolayevich Tolstoy', 'Yasnaya Polyana, Đế quốc Nga', 'none', 'một tiểu thuyết gia người Nga, nhà triết học, người theo chủ nghĩa hoà bình, nhà cải cách giáo dục, người ăn chay, người theo chủ nghĩa vô chính phủ, tín hữu Cơ Đốc giáo, nhà tư tưởng đạo đức và là một thành viên có ảnh hưởng của gia đình Tolstoy.', '2022-09-11 10:28:22', '2022-09-11 10:31:04'),
(13, 'Tolken', 'UK', 'none', 'Novelist', '2022-09-12 14:52:30', '2022-09-12 14:52:30'),
(15, 'Druid', 'Long Bien, Ha Noi, Viet Nam', '0354324599', 'Nhà văn Việt Nam viết tiểu thuyết và truyện ngắn.', '2022-09-17 15:04:27', '2022-09-17 15:04:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wp_book`
--

CREATE TABLE `wp_book` (
  `id` int(11) NOT NULL,
  `name` varchar(100) DEFAULT NULL,
  `price` int(11) DEFAULT NULL,
  `page_number` int(11) DEFAULT NULL,
  `remain_number` int(11) NOT NULL,
  `bought_number` int(11) DEFAULT 0,
  `type` varchar(50) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL,
  `author_id` varchar(20) DEFAULT NULL,
  `voucher_id` varchar(40) DEFAULT NULL,
  `image_number` int(11) NOT NULL DEFAULT 2
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `wp_book`
--

INSERT INTO `wp_book` (`id`, `name`, `price`, `page_number`, `remain_number`, `bought_number`, `type`, `description`, `created`, `modified`, `author_id`, `voucher_id`, `image_number`) VALUES
(1, 'Chu Thành Đôn', 110000, 123, 26, 11, 'novel', 'Anna the stupid one', '2022-08-15 00:00:00', '2022-09-23 16:29:31', '2;4;', '2;5;', 2),
(3, 'Nỗi buồn chiến tranh', 123000, 352, 292, 38, 'novel', 'Nỗi Buồn Chiến Tranh là một tác phẩm dễ làm người đọc ám ảnh vì câu chữ sâu xa, đau đớn, tàn khốc của một đời chiến binh với từng đoạn hồi ức đứt đoạn bởi cảm xúc, bởi những đoạn đời ngắn ngủi mà cho dù cố ghép lại cũng không thể liền mạch.\r\n\r\nKiên - người kể chuyện, trong mười năm chiến tranh và mười năm hoà bình với gia đình lạc loài không hoàn hảo, với tình yêu mãnh liệt, điên cuồng, với hiện thực chẳng thanh cao mà chỉ nhuốm đầy ti tiện của con người. Trong thế giới ấy, Kiên sống mà như đang mộng, mộng trên chiến trường đầy máu, mộng trong cuộc đời liều lĩnh và theo đuổi sự tự do vĩnh cửu.\r\n\r\nNỗi Buồn Chiến Tranh day dứt nhiều hơn buồn. Người đọc lạc vào những trang sách như đang cất bước trong mê cung tâm tưởng với đủ loại người, đủ loại tính cách, đủ loại quan điểm sống mà ít nhiều đều mang tính huỷ diệt. Nhận diện chiến tranh dưới góc nhìn bi quan và tiêu cực, Nỗi Buồn Chiến Tranh khắc hoạ cái định nghĩa bi thảm về chiến tranh, rằng \"Chiến tranh là cõi không nhà không cửa, lang thang khốn khổ và phiêu bạt vĩ đại, là cõi không đàn ông, không đàn bà, là thế giới thảm sầu, vô cảm, là tuyệt tự khủng khiếp nhất của dòng giống con người.\" Trong cái cõi ấy, có hàng ngàn thanh niên, như Kiên, dù đã tự hỏi mình nhưng vẫn nhiệt tình cống hiến, để rồi khi nó qua đi, cả cuộc đời đã không còn lại gì nữa.\r\n\r\nTrang sách khép lại, khó có ai còn thấy bình thường sau những gì đã đọc. Hoang mang, tiếc nuối, tuyệt vọng... với những câu hỏi về đời, về người, về lý tưởng sống mà có lẽ vĩnh viễn, dù con người có cố công tìm kiếm bằng cách nào, cũng không ra lời đáp.\r\n\r\nTác phẩm là dòng hồi ức của người lính về chiến tranh và thời tuổi trẻ đã trải qua trong bom đạn. Đó là lòng tiếc thương vô hạn đối với những người cùng thế hệ với mình đã nằm xuống, là ám ảnh về thân phận con người trong thời buổi loạn ly, và thông qua thân phận là sự tái hiện đầy xót xa về quá khứ, những suy tư nghiền ngẫm về con đường dấn thân của cả một thế hệ sinh ra trong chiến tranh. Bao trùm lên tất cả, là nỗi buồn sâu xa gắn với từng mảnh đời riêng.\r\n\r\nTác phẩm đã bước ra khỏi lối mòn về lòng tự hào dân tộc cùng những chiến công và vinh quang tập thể để nêu lên thông điệp về sự ghê tởm, về tính chất hủy diệt của chiến tranh đối với con người. Vào thời điểm ra đời cuối thập niên 1980, \"Nỗi buồn chiến tranh\" có thể được xem là tác phẩm văn học Việt Nam hiện đại đầu tiên viết về chiến tranh có cái nhìn khác với quan niệm truyền thống, khẳng định mạnh mẽ vai trò cá nhân trong xã hội, quyền sống, hạnh phúc và đau khổ của con người với tư cách một cá thể độc lập. Tiểu thuyết nhận được giải thưởng Hội Nhà văn Việt Nam năm 1991.\r\n\r\nMã hàng	8934974103516\r\nTên Nhà Cung Cấp	NXB Trẻ\r\nTác giả	Bảo Ninh\r\nNXB	NXB Trẻ\r\nNăm XB	2015\r\nTrọng lượng (gr)	310\r\nKích Thước Bao Bì	20 x 13\r\nSố trang	324\r\nHình thức	Bìa Mềm\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nNỗi Buồn Chiến Tranh là một tác phẩm dễ làm người đọc ám ảnh vì câu chữ sâu xa, đau đớn, tàn khốc của một đời chiến binh với từng đoạn hồi ức đứt đoạn bởi cảm xúc, bởi những đoạn đời ngắn ngủi mà cho dù cố ghép lại cũng không thể liền mạch.\r\n\r\nKiên - người kể chuyện, trong mười năm chiến tranh và mười năm hoà bình với gia đình lạc loài không hoàn hảo, với tình yêu mãnh liệt, điên cuồng, với hiện thực chẳng thanh cao mà chỉ nhuốm đầy ti tiện của con người. Trong thế giới ấy, Kiên sống mà như đang mộng, mộng trên chiến trường đầy máu, mộng trong cuộc đời liều lĩnh và theo đuổi sự tự do vĩnh cửu.\r\n\r\nNỗi Buồn Chiến Tranh day dứt nhiều hơn buồn. Người đọc lạc vào những trang sách như đang cất bước trong mê cung tâm tưởng với đủ loại người, đủ loại tính cách, đủ loại quan điểm sống mà ít nhiều đều mang tính huỷ diệt. Nhận diện chiến tranh dưới góc nhìn bi quan và tiêu cực, Nỗi Buồn Chiến Tranh khắc hoạ cái định nghĩa bi thảm về chiến tranh, rằng \"Chiến tranh là cõi không nhà không cửa, lang thang khốn khổ và phiêu bạt vĩ đại, là cõi không đàn ông, không đàn bà, là thế giới thảm sầu, vô cảm, là tuyệt tự khủng khiếp nhất của dòng giống con người.\" Trong cái cõi ấy, có hàng ngàn thanh niên, như Kiên, dù đã tự hỏi mình nhưng vẫn nhiệt tình cống hiến, để rồi khi nó qua đi, cả cuộc đời đã không còn lại gì nữa.\r\n\r\nTrang sách khép lại, khó có ai còn thấy bình thường sau những gì đã đọc. Hoang mang, tiếc nuối, tuyệt vọng... với những câu hỏi về đời, về người, về lý tưởng sống mà có lẽ vĩnh viễn, dù con người có cố công tìm kiếm bằng cách nào, cũng không ra lời đáp.\r\n\r\nTác phẩm là dòng hồi ức của người lính về chiến tranh và thời tuổi trẻ đã trải qua trong bom đạn. Đó là lòng tiếc thương vô hạn đối với những người cùng thế hệ với mình đã nằm xuống, là ám ảnh về thân phận con người trong thời buổi loạn ly, và thông qua thân phận là sự tái hiện đầy xót xa về quá khứ, những suy tư nghiền ngẫm về con đường dấn thân của cả một thế hệ sinh ra trong chiến tranh. Bao trùm lên tất cả, là nỗi buồn sâu xa gắn với từng mảnh đời riêng.\r\n\r\nTác phẩm đã bước ra khỏi lối mòn về lòng tự hào dân tộc cùng những chiến công và vinh quang tập thể để nêu lên thông điệp về sự ghê tởm, về tính chất hủy diệt của chiến tranh đối với con người. Vào thời điểm ra đời cuối thập niên 1980, \"Nỗi buồn chiến tranh\" có thể được xem là tác phẩm văn học Việt Nam hiện đại đầu tiên viết về chiến tranh có cái nhìn khác với quan niệm truyền thống, khẳng định mạnh mẽ vai trò cá nhân trong xã hội, quyền sống, hạnh phúc và đau khổ của con người với tư cách một cá thể độc lập. Tiểu thuyết nhận được giải thưởng Hội Nhà văn Việt Nam năm 1991.', '2022-08-24 20:23:20', '2022-09-23 18:38:08', '3;8;', '3;4;', 2),
(4, 'Đi trốn', 77000, 318, 58, 22, 'novel', '“Đây là một vụ mất tích do nhà văn tưởng tượng ra hay là một hồi ức có thật? Bạn đọc khó lòng phân biệt, nhưng dù là hư cấu hay phi hư cấu, Đi trốn vẫn là một câu chuyện được kể rất sinh động và cảm động.\r\n\r\nVới vốn sống dày dạn phong phú và bằng lời văn kể chuyện giản dị, miêu tả phác họa, nhanh và tự nhiên, chữ nghĩa không cầu kỳ nhưng diễn đạt được nội tâm cùng lối nghĩ và lời nói của các nhân vật một cách rất đúng tuổi đúng thời, nhà văn Bình Ca đã nhẹ nhàng, trữ tình và cả hóm hỉnh nữa, dẫn dắt bạn đọc qua lần lượt những chặng mạo hiểm đầy hấp dẫn và hồi hộp.” - Bảo Ninh, nhà văn\r\n\r\n“Đi trốn là câu chuyện về những đứa trẻ trong sáng và đầy hiếu kỳ nhưng chứa đựng một thông điệp lớn về cuộc đời. - Nguyễn Quang Thiều, nhà văn\r\n\r\nGIỚI THIỆU SÁCH:\r\n\r\nCuộc đi trốn khỏi trại sơ tán vui vui vài ngày của năm đứa trẻ mới lớn đột ngột trở thành một chuyến phiêu lưu li kỳ và nguy hiểm giữa núi non, hang động, sông nước nguyên sơ hoang dã. Trong hành trình ấy chúng được thiên nhiên kỳ thú tưởng thưởng hào phóng, nhưng cũng phải vật lộn để sống sót, mà nhiều lúc tưởng chừng đã tuyệt vọng.\r\n\r\nCâu chuyện chân thực, lôi cuốn, đồng thời gợi nhiều suy ngẫm về cuộc sống và số phận những đứa trẻ lớn lên giữa cuộc chiến tranh: thường xuyên sống xa bố mẹ, thấy súng đạn như đồ chơi, chứng kiến những cái chết xung quanh mình… Nhưng đọng lại sau tất cả, bên cạnh vẻ đẹp của thiên nhiên, Đi trốn cũng làm sáng lên vẻ đẹp của tinh thần tự lực, của tình bạn, và những rung động tình yêu thuở ban đầu.\r\n\r\n\r\nLỜI NÓI ĐẦU:\r\n\r\nMỘT CÂU CHUYỆN SINH ĐỘNG VÀ CẢM ĐỘNG - Bảo Ninh, nhà văn\r\n\r\nNăm năm sau ngày ra mắt Quân khu Nam Đồng, cuốn truyện đầu tay rất hay và thành công của mình, tác giả Bình Ca đã viết xong cuốn thứ hai. Năm năm, là khoảng thời gian vừa phải để hoàn thành một cuốn tiểu thuyết, và sự điềm tĩnh ấy cho thấy là nhà văn đã không vì sự đánh giá cao và cả sự hối thúc nữa của dư luận bạn đọc mà phải vội vã, song cũng không quá chậm rãi khiến làm giảm đi mất nhuệ khí và phong độ của cuốn đầu.\r\n\r\nQua những trang mở đầu cho tiểu thuyết Đi trốn, tôi hiểu do đâu mà tác giả đã tin cậy lựa tôi là một trong những người đọc bản thảo. Là bởi vì cuốn tiểu thuyết này kể về cuộc đời của thế hệ tôi, hoặc nói một cách cụ thể hơn là lứa chúng tôi, những đứa trẻ “con nhà cán bộ kháng chiến”, sinh ra vào đầu thập niên 1950 ở vùng tự do; sau ngày kháng chiến thành công theo gia đình về Thủ đô yên hưởng mười năm hòa bình giữa hai cuộc chiến; tới đầu 1965 cuối thời niên thiếu lại bắt đầu đời gian khổ: rời Hà Nội, xa bố mẹ sơ tán về các miền quê, trải từng cuộc sống kham khổ thiếu thốn cùng đồng bào nông thôn; học hành, thi cử trong không gian đất trời dữ dội thời Chiến tranh Phá hoại; và đến tuổi thanh niên thì tiếp bước cha anh lên đường trường chinh chống Mỹ. “Bởi hầu hết số phận của những đứa trẻ sinh ra, lớn lên trong những năm đất nước có chiến tranh là ở chiến hào.” “Có thể mường tượng thấy hướng đi cuộc đời của các nhân vật trong Đi trốn là như vậy, tuy nhiên tác giả không dõi theo họ cho tới ngày họ lên đường ra trận, mà, như đã nêu trong phần “Vĩ thanh”: “Theo tôi, cuộc đời mỗi người như một dòng sông, luôn chảy về phía trước. Trong cuốn sách này, tôi muốn giới hạn câu chuyện kể về những nhân vật của mình trong một khúc sông tuổi thơ.”\r\n\r\n[...]\r\n\r\nTheo tôi, nhóm bạn trẻ năm người trong tiểu thuyết chính là hình ảnh thời niên thiếu của cánh lính trẻ gốc gác học trò thành thị những năm chống Mỹ. Nhờ vào truyền thống gia đình (mà trong truyện là trực tiếp từ đường đời và số phận có thể nói đầy nghiệt ngã và bi kịch của cha mẹ), và do hoàn cảnh đất nước bị tai ương chiến tranh, phải rời Hà Nội đi sơ tán, sớm chạm trán với khó khăn thử thách, (mà trong truyện là cuộc đi trốn đầy hiểm nguy), các nhân vật thiếu niên hồn nhiên vô tư lúc đầu truyện đến cuối truyện đã từng trải và trưởng thành hẳn lên. Có thể thấy trước rằng với những đức tính và phẩm cách bước đầu có được sau cuộc đi trốn nhớ đời ấy mà Tự Thắng, Việt Bắc, Linh, Thảo sẽ là những nhân vật điển hình cho một thế hệ thanh niên còn ghi dấu mãi trong lịch sử đất nước: thế hệ đã trải qua thời niên thiếu gian khổ nhưng gắn bó sâu nặng với nhân dân dân và thiên nhiên, thế hệ đã kết thúc thắng lợi cuộc kháng chiến chống Mỹ, thế hệ đã đưa đất nước vượt qua gian khó thời hậu chiến bao cấp, thế hệ đã mở màn công cuộc Đổi Mới…\r\n\r\nNhà văn Bình Ca gắn bó mật thiết với thế hệ ấy. Truyện Quân khu Nam Đồng và tiểu thuyết Đi trốn đều kể về thời thanh thiếu niên của họ. Và rồi đây, như nhà văn đã hứa hẹn: “Có thể một ngày nào đó, tôi sẽ kể cho các bạn về họ ở một khúc sông khác, trong một câu chuyện chiến tranh.” Tôi chắc chắn nhà văn sẽ luôn thành công trong văn nghiệp như là sự thành công của thế hệ tuyệt vời ấy.\r\n\r\nMã hàng	8935235228016\r\nTên Nhà Cung Cấp	Nhã Nam\r\nTác giả	Bình Ca\r\nNXB	NXB Hội Nhà Văn\r\nNăm XB	2020\r\nTrọng lượng (gr)	350\r\nKích Thước Bao Bì	20.5 x 14 cm\r\nSố trang	318\r\nHình thức	Bìa Mềm\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\n“Đây là một vụ mất tích do nhà văn tưởng tượng ra hay là một hồi ức có thật? Bạn đọc khó lòng phân biệt, nhưng dù là hư cấu hay phi hư cấu, Đi trốn vẫn là một câu chuyện được kể rất sinh động và cảm động.\r\n\r\nVới vốn sống dày dạn phong phú và bằng lời văn kể chuyện giản dị, miêu tả phác họa, nhanh và tự nhiên, chữ nghĩa không cầu kỳ nhưng diễn đạt được nội tâm cùng lối nghĩ và lời nói của các nhân vật một cách rất đúng tuổi đúng thời, nhà văn Bình Ca đã nhẹ nhàng, trữ tình và cả hóm hỉnh nữa, dẫn dắt bạn đọc qua lần lượt những chặng mạo hiểm đầy hấp dẫn và hồi hộp.” - Bảo Ninh, nhà văn\r\n\r\n“Đi trốn là câu chuyện về những đứa trẻ trong sáng và đầy hiếu kỳ nhưng chứa đựng một thông điệp lớn về cuộc đời. - Nguyễn Quang Thiều, nhà văn\r\n\r\nGIỚI THIỆU SÁCH:\r\n\r\nCuộc đi trốn khỏi trại sơ tán vui vui vài ngày của năm đứa trẻ mới lớn đột ngột trở thành một chuyến phiêu lưu li kỳ và nguy hiểm giữa núi non, hang động, sông nước nguyên sơ hoang dã. Trong hành trình ấy chúng được thiên nhiên kỳ thú tưởng thưởng hào phóng, nhưng cũng phải vật lộn để sống sót, mà nhiều lúc tưởng chừng đã tuyệt vọng.\r\n\r\nCâu chuyện chân thực, lôi cuốn, đồng thời gợi nhiều suy ngẫm về cuộc sống và số phận những đứa trẻ lớn lên giữa cuộc chiến tranh: thường xuyên sống xa bố mẹ, thấy súng đạn như đồ chơi, chứng kiến những cái chết xung quanh mình… Nhưng đọng lại sau tất cả, bên cạnh vẻ đẹp của thiên nhiên, Đi trốn cũng làm sáng lên vẻ đẹp của tinh thần tự lực, của tình bạn, và những rung động tình yêu thuở ban đầu.\r\n\r\n\r\nLỜI NÓI ĐẦU:\r\n\r\nMỘT CÂU CHUYỆN SINH ĐỘNG VÀ CẢM ĐỘNG - Bảo Ninh, nhà văn\r\n\r\nNăm năm sau ngày ra mắt Quân khu Nam Đồng, cuốn truyện đầu tay rất hay và thành công của mình, tác giả Bình Ca đã viết xong cuốn thứ hai. Năm năm, là khoảng thời gian vừa phải để hoàn thành một cuốn tiểu thuyết, và sự điềm tĩnh ấy cho thấy là nhà văn đã không vì sự đánh giá cao và cả sự hối thúc nữa của dư luận bạn đọc mà phải vội vã, song cũng không quá chậm rãi khiến làm giảm đi mất nhuệ khí và phong độ của cuốn đầu.\r\n\r\nQua những trang mở đầu cho tiểu thuyết Đi trốn, tôi hiểu do đâu mà tác giả đã tin cậy lựa tôi là một trong những người đọc bản thảo. Là bởi vì cuốn tiểu thuyết này kể về cuộc đời của thế hệ tôi, hoặc nói một cách cụ thể hơn là lứa chúng tôi, những đứa trẻ “con nhà cán bộ kháng chiến”, sinh ra vào đầu thập niên 1950 ở vùng tự do; sau ngày kháng chiến thành công theo gia đình về Thủ đô yên hưởng mười năm hòa bình giữa hai cuộc chiến; tới đầu 1965 cuối thời niên thiếu lại bắt đầu đời gian khổ: rời Hà Nội, xa bố mẹ sơ tán về các miền quê, trải từng cuộc sống kham khổ thiếu thốn cùng đồng bào nông thôn; học hành, thi cử trong không gian đất trời dữ dội thời Chiến tranh Phá hoại; và đến tuổi thanh niên thì tiếp bước cha anh lên đường trường chinh chống Mỹ. “Bởi hầu hết số phận của những đứa trẻ sinh ra, lớn lên trong những năm đất nước có chiến tranh là ở chiến hào.” “Có thể mường tượng thấy hướng đi cuộc đời của các nhân vật trong Đi trốn là như vậy, tuy nhiên tác giả không dõi theo họ cho tới ngày họ lên đường ra trận, mà, như đã nêu trong phần “Vĩ thanh”: “Theo tôi, cuộc đời mỗi người như một dòng sông, luôn chảy về phía trước. Trong cuốn sách này, tôi muốn giới hạn câu chuyện kể về những nhân vật của mình trong một khúc sông tuổi thơ.”\r\n\r\n[...]\r\n\r\nTheo tôi, nhóm bạn trẻ năm người trong tiểu thuyết chính là hình ảnh thời niên thiếu của cánh lính trẻ gốc gác học trò thành thị những năm chống Mỹ. Nhờ vào truyền thống gia đình (mà trong truyện là trực tiếp từ đường đời và số phận có thể nói đầy nghiệt ngã và bi kịch của cha mẹ), và do hoàn cảnh đất nước bị tai ương chiến tranh, phải rời Hà Nội đi sơ tán, sớm chạm trán với khó khăn thử thách, (mà trong truyện là cuộc đi trốn đầy hiểm nguy), các nhân vật thiếu niên hồn nhiên vô tư lúc đầu truyện đến cuối truyện đã từng trải và trưởng thành hẳn lên. Có thể thấy trước rằng với những đức tính và phẩm cách bước đầu có được sau cuộc đi trốn nhớ đời ấy mà Tự Thắng, Việt Bắc, Linh, Thảo sẽ là những nhân vật điển hình cho một thế hệ thanh niên còn ghi dấu mãi trong lịch sử đất nước: thế hệ đã trải qua thời niên thiếu gian khổ nhưng gắn bó sâu nặng với nhân dân dân và thiên nhiên, thế hệ đã kết thúc thắng lợi cuộc kháng chiến chống Mỹ, thế hệ đã đưa đất nước vượt qua gian khó thời hậu chiến bao cấp, thế hệ đã mở màn công cuộc Đổi Mới…\r\n\r\nNhà văn Bình Ca gắn bó mật thiết với thế hệ ấy. Truyện Quân khu Nam Đồng và tiểu thuyết Đi trốn đều kể về thời thanh thiếu niên của họ. Và rồi đây, như nhà văn đã hứa hẹn: “Có thể một ngày nào đó, tôi sẽ kể cho các bạn về họ ở một khúc sông khác, trong một câu chuyện chiến tranh.” Tôi chắc chắn nhà văn sẽ luôn thành công trong văn nghiệp như là sự thành công của thế hệ tuyệt vời ấy.', '2022-08-24 20:23:20', '2022-09-23 18:38:59', '3', '1;3;4', 2),
(5, 'Mặt trời trong lạnh', 78000, 160, 60, 20, 'short_story', 'Mặt Trời Trong Suối Lạnh\r\n\r\n“Mặt trời trong suối lạnh” - lạc lõng, cô độc và khát khao thấu hiểu đến thế!\r\n\r\nNguyễn Phương Văn đã hoá thân xuất thần vào các nhân vật trong chuyện của mình, vào Sanh, Giang, Li, Quyên, Di… khiến họ bứt mình bước ra khỏi trang sách, tái hiện một cách chân thực thế giới của những người trẻ trong thế kỷ XX - thời kỳ Việt Nam có nhiều biến động về chính trị.\r\n\r\nTác giả phô diễn nỗi sợ ngàn đời vẫn âm ỉ cháy trong trái tim của mỗi người trẻ - sợ không được “chạm vào”, được giãi bày và sẻ chia. Nó là một phần của tuổi trẻ, ở bất kỳ thời kỳ nào.\r\n\r\nNhững người trẻ trong “Mặt trời trong suối lạnh” không thể chống lại hiện thực khốc liệt, không thay đổi được hướng đi của thời đại, họ chỉ đành thả mình trôi vô định trong nỗi buồn và mông lung về hiện thực. Có lẽ điều duy nhất khiến họ cảm nhận được sự hiện hữu của mình là trong những lần gần gũi với người tình, đắm mình trong khoái lạc của thể xác.\r\n\r\nSự cô độc của nhân vật này nối liền nhân vật khác, tựa như trò chơi domino không có điểm kết thúc. Ta cảm nhận được sự hoang tàn, lạc lối, lại thấu suốt được bối cảnh đầy biến động của thời đại lúc bấy giờ.\r\n\r\nTÌNH YÊU là một trong những điều cứu rỗi linh hồn, là cầu nối để hơi ấm người với người được gần gũi nhau hơn.\r\n\r\nKhép lại những trang cuối trong “Mặt trời là suối lạnh”, ta hiểu được nỗi thống khổ những người trẻ thời kỳ cha ông ta. Họ gánh trên vai mình kỳ vọng của những người đi trước, dắt díu thế hệ đàn em đi sau. Có nhiều lúc họ nhận ra mình đã đánh mất chính mình. \r\n\r\nNhưng trong thời đại biến động đó, có người bị nỗi sợ chèn ép và rơi xuống “đầm lầy”, nhưng cũng có người lạc quan, dũng cảm sống tiếp và kiếm tìm ý nghĩa thực sự của tự do và tình yêu.\r\n\r\n“Mặt trời trong suối lạnh” - Cho tuổi trẻ cô độc và điên cuồng.\r\n\r\nMã hàng	8935325005473\r\nTên Nhà Cung Cấp	Skybooks\r\nTác giả	Nguyễn Phương Văn\r\nNXB	NXB Phụ Nữ Việt Nam\r\nNăm XB	2022\r\nNgôn Ngữ	Tiếng Việt\r\nTrọng lượng (gr)	200\r\nKích Thước Bao Bì	19 x 13 cm\r\nSố trang	160\r\nHình thức	Bìa Mềm\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nMặt Trời Trong Suối Lạnh\r\n\r\n“Mặt trời trong suối lạnh” - lạc lõng, cô độc và khát khao thấu hiểu đến thế!\r\n\r\nNguyễn Phương Văn đã hoá thân xuất thần vào các nhân vật trong chuyện của mình, vào Sanh, Giang, Li, Quyên, Di… khiến họ bứt mình bước ra khỏi trang sách, tái hiện một cách chân thực thế giới của những người trẻ trong thế kỷ XX - thời kỳ Việt Nam có nhiều biến động về chính trị.\r\n\r\nTác giả phô diễn nỗi sợ ngàn đời vẫn âm ỉ cháy trong trái tim của mỗi người trẻ - sợ không được “chạm vào”, được giãi bày và sẻ chia. Nó là một phần của tuổi trẻ, ở bất kỳ thời kỳ nào.\r\n\r\nNhững người trẻ trong “Mặt trời trong suối lạnh” không thể chống lại hiện thực khốc liệt, không thay đổi được hướng đi của thời đại, họ chỉ đành thả mình trôi vô định trong nỗi buồn và mông lung về hiện thực. Có lẽ điều duy nhất khiến họ cảm nhận được sự hiện hữu của mình là trong những lần gần gũi với người tình, đắm mình trong khoái lạc của thể xác.\r\n\r\nSự cô độc của nhân vật này nối liền nhân vật khác, tựa như trò chơi domino không có điểm kết thúc. Ta cảm nhận được sự hoang tàn, lạc lối, lại thấu suốt được bối cảnh đầy biến động của thời đại lúc bấy giờ.\r\n\r\nTÌNH YÊU là một trong những điều cứu rỗi linh hồn, là cầu nối để hơi ấm người với người được gần gũi nhau hơn.\r\n\r\nKhép lại những trang cuối trong “Mặt trời là suối lạnh”, ta hiểu được nỗi thống khổ những người trẻ thời kỳ cha ông ta. Họ gánh trên vai mình kỳ vọng của những người đi trước, dắt díu thế hệ đàn em đi sau. Có nhiều lúc họ nhận ra mình đã đánh mất chính mình. \r\n\r\nNhưng trong thời đại biến động đó, có người bị nỗi sợ chèn ép và rơi xuống “đầm lầy”, nhưng cũng có người lạc quan, dũng cảm sống tiếp và kiếm tìm ý nghĩa thực sự của tự do và tình yêu.\r\n\r\n“Mặt trời trong suối lạnh” - Cho tuổi trẻ cô độc và điên cuồng.', '2022-08-24 20:23:20', '2022-09-25 13:44:06', '4;', '3;5;', 2),
(6, 'Con Chim Xanh Biếc Bay Về', 112000, 396, 60, 20, 'novel', 'Con Chim Xanh Biếc Bay Về\r\n\r\nKhông giống như những tác phẩm trước đây lấy bối cảnh vùng quê miền Trung đầy ắp những hoài niệm tuổi thơ dung dị, trong trẻo với các nhân vật ở độ tuổi dậy thì, trong quyển sách mới lần này nhà văn Nguyễn Nhật Ánh lấy bối cảnh chính là Sài Gòn – Thành phố Hồ Chí Minh nơi tác giả sinh sống (như là một sự đền đáp ân tình với mảnh đất miền Nam). Các nhân vật chính trong truyện cũng “lớn” hơn, với những câu chuyện mưu sinh lập nghiệp lắm gian nan thử thách của các sinh viên trẻ đầy hoài bão. Tất nhiên không thể thiếu những câu chuyện tình cảm động, kịch tính và bất ngờ khiến bạn đọc ngẩn ngơ, cười ra nước mắt. Và như trong mọi tác phẩm Nguyễn Nhật Ánh, sự tử tế và tinh thần hướng thượng vẫn là điểm nhấn quan trọng trong quyển sách mới này.\r\n\r\nNhư một cuốn phim “trinh thám tình yêu”, Con chim xanh biếc bay về dẫn bạn đi hết từ bất ngờ này đến tò mò suy đoán khác, để kết thúc bằng một nỗi hân hoan vô bờ sau bao phen hồi hộp nghi kỵ đến khó thở.\r\n\r\nBạn sẽ theo phe sinh viên-nhân viên với những câu thơ dịu dàng và đáo để, hay phe ông chủ với những kỹ năng kinh doanh khởi nghiệp? Và hãy đoán thử, điều gì khiến bạn có thể cảm động đến rưng rưng trong cuộc sống giữa Sài Gòn bộn bề?\r\n\r\nLâu lắm mới có hình ảnh thành phố rộn ràng trong tác phẩm của Nguyễn Nhật Ánh - điều hấp dẫn khác thường của Con chim xanh biếc bay về.\r\n\r\nChính vì thế mà cuốn sách chỉ có một cách đọc thôi: một mạch từ đầu đến cuối!\r\n\r\nMã hàng	8934974170617\r\nTên Nhà Cung Cấp	NXB Trẻ\r\nTác giả	Nguyễn Nhật Ánh\r\nNXB	NXB Trẻ\r\nNăm XB	2020\r\nNgôn Ngữ	Tiếng Việt\r\nTrọng lượng (gr)	400\r\nKích Thước Bao Bì	20 x 13 cm\r\nSố trang	396\r\nHình thức	Bìa Mềm\r\nSản phẩm hiển thị trong	\r\nSÁCH NGUYỄN NHẬT ÁNH - CON CHIM XANH BIẾC BAY VỀ\r\nNguyễn Nhật Ánh\r\nCác Tác Giả Trẻ Được Yêu Thích\r\nRƯỚC DEAL LINH ĐÌNH VUI ĐÓN TRUNG THU\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Tiểu thuyết bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nCon Chim Xanh Biếc Bay Về\r\n\r\nKhông giống như những tác phẩm trước đây lấy bối cảnh vùng quê miền Trung đầy ắp những hoài niệm tuổi thơ dung dị, trong trẻo với các nhân vật ở độ tuổi dậy thì, trong quyển sách mới lần này nhà văn Nguyễn Nhật Ánh lấy bối cảnh chính là Sài Gòn – Thành phố Hồ Chí Minh nơi tác giả sinh sống (như là một sự đền đáp ân tình với mảnh đất miền Nam). Các nhân vật chính trong truyện cũng “lớn” hơn, với những câu chuyện mưu sinh lập nghiệp lắm gian nan thử thách của các sinh viên trẻ đầy hoài bão. Tất nhiên không thể thiếu những câu chuyện tình cảm động, kịch tính và bất ngờ khiến bạn đọc ngẩn ngơ, cười ra nước mắt. Và như trong mọi tác phẩm Nguyễn Nhật Ánh, sự tử tế và tinh thần hướng thượng vẫn là điểm nhấn quan trọng trong quyển sách mới này.\r\n\r\nNhư một cuốn phim “trinh thám tình yêu”, Con chim xanh biếc bay về dẫn bạn đi hết từ bất ngờ này đến tò mò suy đoán khác, để kết thúc bằng một nỗi hân hoan vô bờ sau bao phen hồi hộp nghi kỵ đến khó thở.\r\n\r\nBạn sẽ theo phe sinh viên-nhân viên với những câu thơ dịu dàng và đáo để, hay phe ông chủ với những kỹ năng kinh doanh khởi nghiệp? Và hãy đoán thử, điều gì khiến bạn có thể cảm động đến rưng rưng trong cuộc sống giữa Sài Gòn bộn bề?\r\n\r\nLâu lắm mới có hình ảnh thành phố rộn ràng trong tác phẩm của Nguyễn Nhật Ánh - điều hấp dẫn khác thường của Con chim xanh biếc bay về.\r\n\r\nChính vì thế mà cuốn sách chỉ có một cách đọc thôi: một mạch từ đầu đến cuối!', '2022-08-24 20:23:20', '2022-09-25 13:43:21', '5;', '3;6;', 2),
(7, 'Tiếng Gọi Nơi Hoang Dã', 90000, 256, 60, 20, 'short_story', 'Bộ Sách Tiếng Gọi Của Hoang Dã + Cánh Buồn Đỏ Thắm ( Bộ 2 Cuốn)\r\n\r\n1. Tiếng Gọi Của Hoang Dã\r\n\r\nJack London (18761916) là nhà văn nổi tiếng người Mỹ, tác giả Tiếng gọi của hoang dã, Gót sắt, Martin eden, Tình yêu cuộc sống, Nanh trắng, và hơn 50 tác phẩm khác.\r\n\r\nTrong cuộc đời ngắn ngủi của mình ông là nhà văn tiêng phong của thể loại tạp trí thương mai đang thịnh hành lúc bấy giờ, ông là một trong những người Mỹ dầu tiên gặt hái thành công về mặt tài chính từ nghề viết văn.\r\n\r\nCốt truyện kể về một con chó tên là Buck đã được thuần hóa, cưng chiều. Nhưng một loạt các sự kiện xảy ra khi Buck bị bắt khỏi trang trại để trở thành chó kéo xe ở khu vực Alaska lạnh giá, trong giai đoạn mọi người đổ xô đi tìm vàng thế kỷ 19, thiên nhiên nguyên thủy đã đánh thức bản năng của Buck. Buck trở lại cuộc sống hoang dã. Buck trở về rừng, và sống chung với lũ sói.\r\n\r\n \r\n\r\n2. Cánh Buồn Đỏ Thắm\r\n\r\nCánh Buồm Đỏ Thắm là một câu chuyện lãng mạn dành cho lứa tuổi mới lớn của nhà văn Alexander Grin. \r\n\r\nTác phẩm được viết trong sáu năm, từ năm 1916 đến 1922 mới hoàn tất và đã được hãng Mosfilm chuyển thể thành phim năm 1961.\r\n\r\nMã hàng	8935210250773\r\nTên Nhà Cung Cấp	Tân Việt\r\nTác giả	Alexander Grin, Jack London\r\nNXB	NXB Văn Học\r\nNăm XB	2019\r\nTrọng lượng (gr)	370\r\nKích Thước Bao Bì	20.5 x 13.5 cm\r\nHình thức	Bìa Mềm\r\nSản phẩm hiển thị trong	\r\nTân Việt\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Tác Phẩm Kinh Điển bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nBộ Sách Tiếng Gọi Của Hoang Dã + Cánh Buồn Đỏ Thắm ( Bộ 2 Cuốn)\r\n\r\n1. Tiếng Gọi Của Hoang Dã\r\n\r\nJack London (18761916) là nhà văn nổi tiếng người Mỹ, tác giả Tiếng gọi của hoang dã, Gót sắt, Martin eden, Tình yêu cuộc sống, Nanh trắng, và hơn 50 tác phẩm khác.\r\n\r\nTrong cuộc đời ngắn ngủi của mình ông là nhà văn tiêng phong của thể loại tạp trí thương mai đang thịnh hành lúc bấy giờ, ông là một trong những người Mỹ dầu tiên gặt hái thành công về mặt tài chính từ nghề viết văn.\r\n\r\nCốt truyện kể về một con chó tên là Buck đã được thuần hóa, cưng chiều. Nhưng một loạt các sự kiện xảy ra khi Buck bị bắt khỏi trang trại để trở thành chó kéo xe ở khu vực Alaska lạnh giá, trong giai đoạn mọi người đổ xô đi tìm vàng thế kỷ 19, thiên nhiên nguyên thủy đã đánh thức bản năng của Buck. Buck trở lại cuộc sống hoang dã. Buck trở về rừng, và sống chung với lũ sói.\r\n\r\n \r\n\r\n2. Cánh Buồn Đỏ Thắm\r\n\r\nCánh Buồm Đỏ Thắm là một câu chuyện lãng mạn dành cho lứa tuổi mới lớn của nhà văn Alexander Grin. \r\n\r\nTác phẩm được viết trong sáu năm, từ năm 1916 đến 1922 mới hoàn tất và đã được hãng Mosfilm chuyển thể thành phim năm 1961.', '2022-08-24 20:23:20', '2022-09-25 13:44:33', '6;', '3;5;', 2),
(8, 'Bố Già', 142000, 642, 60, 20, 'novel', 'Bố Già (Tái Bản 2022)\r\n\r\nThế giới ngầm được phản ánh trong tiểu thuyết Bố già là sự gặp gỡ giữa một bên là ý chí cương cường và nền tảng gia tộc chặt chẽ theo truyền thống mafia xứ Sicily với một bên là xã hội Mỹ nhập nhằng đen trắng, mảnh đất màu mỡ cho những cơ hội làm ăn bất chính hứa hẹn những món lợi kếch xù. Trong thế giới ấy, hình tượng Bố già được tác giả dày công khắc họa đã trở thành bức chân dung bất hủ trong lòng người đọc. Từ một kẻ nhập cư tay trắng đến ông trùm tột đỉnh quyền uy, Don Vito Corleone là con rắn hổ mang thâm trầm, nguy hiểm khiến kẻ thù phải kiềng nể, e dè, nhưng cũng được bạn bè, thân quyến xem như một đấng toàn năng đầy nghĩa khí. Nhân vật trung tâm ấy đồng thời cũng là hiện thân của một pho triết lí rất “đời” được nhào nặn từ vốn sống của hàng chục năm lăn lộn giữa chốn giang hồ bao phen vào sinh ra tử, vì thế mà có ý kiến cho rằng “Bố già là sự tổng hòa của mọi hiểu biết. Bố già là đáp án cho mọi câu hỏi”.\r\n\r\nVới cấu tứ hoàn hảo, cốt truyện không thiếu những pha hành động gay cấn, tình tiết bất ngờ và không khí kình địch đến nghẹt thở, Bố già xứng đáng là đỉnh cao trong sự nghiệp văn chương của Mario Puzo. Và như một cơ duyên đặc biệt, ngay từ năm 1971-1972, Bố già đã đến với bạn đọc trong nước qua phong cách chuyển ngữ hào sảng, đậm chất giang hồ của dịch giả Ngọc Thứ Lang.\r\n\r\nNăm 2014, Đông A giới thiệu tới bạn đọc tác phẩm Bố già có bản quyền chính thức tại Việt Nam qua bản dịch lôi cuốn, hấp dẫn của Ngọc Thứ Lang.\r\n\r\nVài nét về tác giả:\r\n\r\nMario Puzo (1920 - 1999) là nhà văn, nhà biên kịch người Mỹ gốc Italy nổi tiếng với nhiều tiểu thuyết về đề tài mafia và tội phạm. Bố già (The Godfather) xuất bản năm 1969 là đỉnh cao của dòng văn chương hư cấu này, đồng thời là tác phẩm đưa Puzo lên tột đỉnh vinh quang. Đây cũng là một trong những tiểu thuyết bán chạy nhất mọi thời đại. Ngoài Bố già, Mario Puzo còn nổi tiếng với các tiểu thuyết khác như Sicilian khúc ca bi tráng, Luật im lặng, Ông trùm quyền lực cuối cùng, Gia đình Giáo hoàng…\r\n\r\nVài nét về dịch giả:\r\n\r\nNgọc Thứ Lang tên thật là Nguyễn Ngọc Tú, biệt danh là công tử Bắc Kỳ, vào Sài Gòn lập nghiệp khoảng năm 1950. Ngọc Thứ Lang là dịch giả của thời kì trước năm 1975, đã chuyển ngữ nhiều tác phẩm nhưng có lẽ Bố già là một dấu son trong sự nghiệp của ông.\r\n\r\nNăm 1972, bản dịch Bố già của Ngọc Thứ Lang chuyển ngữ từ nguyên bản tiếng Anh ra mắt và đã thu hút được sự chú ý của rất nhiều độc giả. Nếu như The Godfather của Mario Puzo khi vừa xuất bản đã nằm trong danh sách sách bán chạy nhất suốt 67 tuần thì Bố già của Ngọc Thứ Lang cũng “làm mưa làm gió” trên thị trường văn học dịch của Sài Gòn những năm 70 của thế kỉ trước.\r\n\r\nCái hay, cái khiến người đọc say mê Bố già có lẽ nằm ở chính giọng văn đậm chất giang hồ súng đạn của người dịch. Và bản thân cái tên Bố già cũng là một sáng tạo vô tiền khoáng hậu của Ngọc Thứ Lang. Nhiều độc giả Việt Nam nói rằng nếu đọc The Godfather của Mario Puzo, hãy tìm đúng bản dịch của Ngọc Thứ Lang để thấy chất đàn ông trong đó…\r\n\r\nNhận xét về tác phẩm:\r\n\r\n“Bố già là sự tổng hòa của mọi hiểu biết. Bố già là đáp án cho mọi câu hỏi.” - Diễn viên Tom Hanks\r\n\r\n“Bạn không thể dừng đọc nó và khó lòng ngừng mơ về nó.” - New York Times Magazine\r\n\r\n“Một tác phẩm kinh điển về mafia… Tự bản thân nó đã tạo ra một thứ bùa mê hoặc độc giả.”- The Times\r\n\r\nMã hàng	8936203361896\r\nTên Nhà Cung Cấp	Đông A\r\nTác giả	Mario Puzo\r\nNgười Dịch	Ngọc Thứ Lang\r\nNXB	Văn Học\r\nNăm XB	2022\r\nTrọng lượng (gr)	692\r\nKích Thước Bao Bì	20.5 x 14.5 x 3 cm\r\nSố trang	642\r\nHình thức	Bìa Mềm\r\nSản phẩm hiển thị trong	\r\nĐông A\r\nSách Mới\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Tác Phẩm Kinh Điển bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nBố Già (Tái Bản 2022)\r\n\r\nThế giới ngầm được phản ánh trong tiểu thuyết Bố già là sự gặp gỡ giữa một bên là ý chí cương cường và nền tảng gia tộc chặt chẽ theo truyền thống mafia xứ Sicily với một bên là xã hội Mỹ nhập nhằng đen trắng, mảnh đất màu mỡ cho những cơ hội làm ăn bất chính hứa hẹn những món lợi kếch xù. Trong thế giới ấy, hình tượng Bố già được tác giả dày công khắc họa đã trở thành bức chân dung bất hủ trong lòng người đọc. Từ một kẻ nhập cư tay trắng đến ông trùm tột đỉnh quyền uy, Don Vito Corleone là con rắn hổ mang thâm trầm, nguy hiểm khiến kẻ thù phải kiềng nể, e dè, nhưng cũng được bạn bè, thân quyến xem như một đấng toàn năng đầy nghĩa khí. Nhân vật trung tâm ấy đồng thời cũng là hiện thân của một pho triết lí rất “đời” được nhào nặn từ vốn sống của hàng chục năm lăn lộn giữa chốn giang hồ bao phen vào sinh ra tử, vì thế mà có ý kiến cho rằng “Bố già là sự tổng hòa của mọi hiểu biết. Bố già là đáp án cho mọi câu hỏi”.\r\n\r\nVới cấu tứ hoàn hảo, cốt truyện không thiếu những pha hành động gay cấn, tình tiết bất ngờ và không khí kình địch đến nghẹt thở, Bố già xứng đáng là đỉnh cao trong sự nghiệp văn chương của Mario Puzo. Và như một cơ duyên đặc biệt, ngay từ năm 1971-1972, Bố già đã đến với bạn đọc trong nước qua phong cách chuyển ngữ hào sảng, đậm chất giang hồ của dịch giả Ngọc Thứ Lang.\r\n\r\nNăm 2014, Đông A giới thiệu tới bạn đọc tác phẩm Bố già có bản quyền chính thức tại Việt Nam qua bản dịch lôi cuốn, hấp dẫn của Ngọc Thứ Lang.\r\n\r\nVài nét về tác giả:\r\n\r\nMario Puzo (1920 - 1999) là nhà văn, nhà biên kịch người Mỹ gốc Italy nổi tiếng với nhiều tiểu thuyết về đề tài mafia và tội phạm. Bố già (The Godfather) xuất bản năm 1969 là đỉnh cao của dòng văn chương hư cấu này, đồng thời là tác phẩm đưa Puzo lên tột đỉnh vinh quang. Đây cũng là một trong những tiểu thuyết bán chạy nhất mọi thời đại. Ngoài Bố già, Mario Puzo còn nổi tiếng với các tiểu thuyết khác như Sicilian khúc ca bi tráng, Luật im lặng, Ông trùm quyền lực cuối cùng, Gia đình Giáo hoàng…\r\n\r\nVài nét về dịch giả:\r\n\r\nNgọc Thứ Lang tên thật là Nguyễn Ngọc Tú, biệt danh là công tử Bắc Kỳ, vào Sài Gòn lập nghiệp khoảng năm 1950. Ngọc Thứ Lang là dịch giả của thời kì trước năm 1975, đã chuyển ngữ nhiều tác phẩm nhưng có lẽ Bố già là một dấu son trong sự nghiệp của ông.\r\n\r\nNăm 1972, bản dịch Bố già của Ngọc Thứ Lang chuyển ngữ từ nguyên bản tiếng Anh ra mắt và đã thu hút được sự chú ý của rất nhiều độc giả. Nếu như The Godfather của Mario Puzo khi vừa xuất bản đã nằm trong danh sách sách bán chạy nhất suốt 67 tuần thì Bố già của Ngọc Thứ Lang cũng “làm mưa làm gió” trên thị trường văn học dịch của Sài Gòn những năm 70 của thế kỉ trước.\r\n\r\nCái hay, cái khiến người đọc say mê Bố già có lẽ nằm ở chính giọng văn đậm chất giang hồ súng đạn của người dịch. Và bản thân cái tên Bố già cũng là một sáng tạo vô tiền khoáng hậu của Ngọc Thứ Lang. Nhiều độc giả Việt Nam nói rằng nếu đọc The Godfather của Mario Puzo, hãy tìm đúng bản dịch của Ngọc Thứ Lang để thấy chất đàn ông trong đó…\r\n\r\nNhận xét về tác phẩm:\r\n\r\n“Bố già là sự tổng hòa của mọi hiểu biết. Bố già là đáp án cho mọi câu hỏi.” - Diễn viên Tom Hanks\r\n\r\n“Bạn không thể dừng đọc nó và khó lòng ngừng mơ về nó.” - New York Times Magazine\r\n\r\n“Một tác phẩm kinh điển về mafia… Tự bản thân nó đã tạo ra một thứ bùa mê hoặc độc giả.”- The Times', '2022-08-24 20:23:20', '2022-09-25 13:44:58', '7;', '6;', 2),
(9, 'Đại Gia Gatsby', 81000, 260, 60, 20, 'novel', 'Kiệt tác Gatsby vĩ đại (1925) của văn hào Mỹ F. Scott Fitzgerald (1896-1940) là câu chuyện về chàng trai Jay Gatsby muốn thoát khỏi thân phận nghèo hèn và đặt chân vào tầng lớp cao sang mà hiện thân là một cô gái nhà giầu anh đã yêu và được yêu khi còn khoác trên vai bộ quân phục không phân biệt đẳng cấp giầu nghèo. Qua mối tình mãnh liệt và mê muội của Gatsby, bằng một lối văn cực kỳ súc tích, đa tầng khiến cho ngay T. S. Eliot, nhà văn gốc Mỹ đương thời với Fitzgerald, Giải thưởng Nobel về văn học năm 1948, như kể lại trong thư viết cho tác giả, đã phải đọc đi đọc lại ba lần trong năm 1925, Fitzgerald đã vẽ ra một trong bức tranh cô đọng nhất, sâu sắc và giầu biểu tượng nhất về xã hội Mỹ trong những năm 1920 với đủ các mặt tàn nhẫn, giả dối, bịp bợm và ích kỷ của nó.\r\n\r\nMang trong mình những ước vọng và cả những mâu thuẫn chứa chất trong tâm hồn con người Mỹ, trong kiệt tác văn chương này tác giả đã phơi bày một cách ngậm ngùi, đau xót sự tan vỡ của những mộng tưởng ở nước Mỹ, mặt giả dối, hư trá của Giấc mơ Mỹ từng được nhen lên và nuôi dưỡng ở những người định cư đầu tiên kể từ giây phút khám phá và đặt chân lên “Tân thế giới” này.\r\n\r\nKhông được độc giả đương thời nồng nhiệt đón nhận ngay mà phải đợi đến 20 năm sau, khi Fitzgerald đã qua đời 5 năm, Gatsby vĩ đại mới được công chúng Mỹ cũng như các nước trên thế giới hoan nghênh như một tác phẩm kinh điển của văn học Mỹ, được chọn là một trong “10 tác phẩm lớn nhất của mọi thời đại” do tạp chí Time  tổ chức, đứng thứ hai trong danh sách 100 tiểu thuyết hay nhất thế kỷ 20 của Modern Library, được đưa vào giảng dạy tại các trường trung học và đại học ở Mỹ và nhiều nước trên thế giới. \r\n\r\nGatsby vĩ đại đã được đưa lên màn ảnh nhiều lần với cùng tiêu đề. Bản chuyển thể thành công và trung thành với nguyên tác nhất là bộ phim của đạo diễn Jack Clayton thực hiện năm 1974 với các diễn viên Robert Redford và Mia Farrow, được 2 giải Oscar. Với bộ phim chuyển thể năm 2013 của đạo diễn Baz Luhrmann, dư luận cho rằng diễn viên Leo DiCaprio đã không thể hiện được con người Gatsby như hình dung của tác giả và phần lớn độc giả.\r\n\r\nKiệt tác Gatsby vĩ đại (1925) của văn hào Mỹ F. Scott Fitzgerald (1896-1940) là câu chuyện về chàng trai Jay Gatsby muốn thoát khỏi thân phận nghèo hèn và đặt chân vào tầng lớp cao sang mà hiện thân là một cô gái nhà giầu anh đã yêu và được yêu khi còn khoác trên vai bộ quân phục không phân biệt đẳng cấp giầu nghèo. Qua mối tình mãnh liệt và mê muội của Gatsby, bằng một lối văn cực kỳ súc tích, đa tầng Fitzgerald đã vẽ ra một trong bức tranh cô đọng nhất, sâu sắc và giầu biểu tượng nhất về xã hội Mỹ trong những năm 1920 với đủ các mặt tàn nhẫn, giả dối, bịp bợm và ích kỷ của nó.\r\n\r\nMang trong mình những ước vọng và cả những mâu thuẫn chứa chất trong tâm hồn con người Mỹ, trong kiệt tác văn chương này tác giả đã phơi bày một cách ngậm ngùi, đau xót sự tan vỡ của những mộng tưởng ở nước Mỹ, mặt giả dối, hư trá của Giấc mơ Mỹ từng được nhen lên và nuôi dưỡng ở những người định cư đầu tiên kể từ giây phút khám phá và đặt chân lên “Tân thế giới” này.\r\n\r\nKhông được độc giả đương thời nồng nhiệt đón nhận ngay mà phải đợi đến 20 năm sau, khi Fitzgerald đã qua đời 5 năm,Gatsby vĩ đại mới được công chúng Mỹ cũng như các nước trên thế giới hoan nghênh như một tác phẩm kinh điển của văn học Mỹ, được chọn là một trong “10 tác phẩm lớn nhất của mọi thời đại” do tạp chí Time tổ chức, đứng thứ hai trong danh sách 100 tiểu thuyết hay nhất thế kỷ 20 của Modern Library, được đưa vào giảng dạy tại các trường trung học và đại học ở Mỹ và nhiều nước trên thế giới.\r\n\r\nGatsby vĩ đại đến nay không hẳn còn xa lạ với bạn đọc Việt Nam, để đưa bạn đọc đến cái nhìn mới và chân thật  hơn về Gatsby, HGB xin gửi tới bạn đọc bản in song ngữ Anh Việt .\r\n\r\nMời các bạn đón đọc!\r\n\r\nMã hàng	9786047715091\r\nNhà Cung Cấp	Cty Sách Hương Giang\r\nTác giả	F Scott Fitzgerald\r\nNXB	Thế Giới\r\nNăm XB	06/2015\r\nTrọng lượng (gr)	550\r\nKích Thước Bao Bì	14 x20.5\r\nHình thức	Bìa Mềm\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Tác Phẩm Kinh Điển bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nKiệt tác Gatsby vĩ đại (1925) của văn hào Mỹ F. Scott Fitzgerald (1896-1940) là câu chuyện về chàng trai Jay Gatsby muốn thoát khỏi thân phận nghèo hèn và đặt chân vào tầng lớp cao sang mà hiện thân là một cô gái nhà giầu anh đã yêu và được yêu khi còn khoác trên vai bộ quân phục không phân biệt đẳng cấp giầu nghèo. Qua mối tình mãnh liệt và mê muội của Gatsby, bằng một lối văn cực kỳ súc tích, đa tầng khiến cho ngay T. S. Eliot, nhà văn gốc Mỹ đương thời với Fitzgerald, Giải thưởng Nobel về văn học năm 1948, như kể lại trong thư viết cho tác giả, đã phải đọc đi đọc lại ba lần trong năm 1925, Fitzgerald đã vẽ ra một trong bức tranh cô đọng nhất, sâu sắc và giầu biểu tượng nhất về xã hội Mỹ trong những năm 1920 với đủ các mặt tàn nhẫn, giả dối, bịp bợm và ích kỷ của nó.\r\n\r\nMang trong mình những ước vọng và cả những mâu thuẫn chứa chất trong tâm hồn con người Mỹ, trong kiệt tác văn chương này tác giả đã phơi bày một cách ngậm ngùi, đau xót sự tan vỡ của những mộng tưởng ở nước Mỹ, mặt giả dối, hư trá của Giấc mơ Mỹ từng được nhen lên và nuôi dưỡng ở những người định cư đầu tiên kể từ giây phút khám phá và đặt chân lên “Tân thế giới” này.\r\n\r\nKhông được độc giả đương thời nồng nhiệt đón nhận ngay mà phải đợi đến 20 năm sau, khi Fitzgerald đã qua đời 5 năm, Gatsby vĩ đại mới được công chúng Mỹ cũng như các nước trên thế giới hoan nghênh như một tác phẩm kinh điển của văn học Mỹ, được chọn là một trong “10 tác phẩm lớn nhất của mọi thời đại” do tạp chí Time  tổ chức, đứng thứ hai trong danh sách 100 tiểu thuyết hay nhất thế kỷ 20 của Modern Library, được đưa vào giảng dạy tại các trường trung học và đại học ở Mỹ và nhiều nước trên thế giới. \r\n\r\nGatsby vĩ đại đã được đưa lên màn ảnh nhiều lần với cùng tiêu đề. Bản chuyển thể thành công và trung thành với nguyên tác nhất là bộ phim của đạo diễn Jack Clayton thực hiện năm 1974 với các diễn viên Robert Redford và Mia Farrow, được 2 giải Oscar. Với bộ phim chuyển thể năm 2013 của đạo diễn Baz Luhrmann, dư luận cho rằng diễn viên Leo DiCaprio đã không thể hiện được con người Gatsby như hình dung của tác giả và phần lớn độc giả.\r\n\r\nKiệt tác Gatsby vĩ đại (1925) của văn hào Mỹ F. Scott Fitzgerald (1896-1940) là câu chuyện về chàng trai Jay Gatsby muốn thoát khỏi thân phận nghèo hèn và đặt chân vào tầng lớp cao sang mà hiện thân là một cô gái nhà giầu anh đã yêu và được yêu khi còn khoác trên vai bộ quân phục không phân biệt đẳng cấp giầu nghèo. Qua mối tình mãnh liệt và mê muội của Gatsby, bằng một lối văn cực kỳ súc tích, đa tầng Fitzgerald đã vẽ ra một trong bức tranh cô đọng nhất, sâu sắc và giầu biểu tượng nhất về xã hội Mỹ trong những năm 1920 với đủ các mặt tàn nhẫn, giả dối, bịp bợm và ích kỷ của nó.\r\n\r\nMang trong mình những ước vọng và cả những mâu thuẫn chứa chất trong tâm hồn con người Mỹ, trong kiệt tác văn chương này tác giả đã phơi bày một cách ngậm ngùi, đau xót sự tan vỡ của những mộng tưởng ở nước Mỹ, mặt giả dối, hư trá của Giấc mơ Mỹ từng được nhen lên và nuôi dưỡng ở những người định cư đầu tiên kể từ giây phút khám phá và đặt chân lên “Tân thế giới” này.\r\n\r\nKhông được độc giả đương thời nồng nhiệt đón nhận ngay mà phải đợi đến 20 năm sau, khi Fitzgerald đã qua đời 5 năm,Gatsby vĩ đại mới được công chúng Mỹ cũng như các nước trên thế giới hoan nghênh như một tác phẩm kinh điển của văn học Mỹ, được chọn là một trong “10 tác phẩm lớn nhất của mọi thời đại” do tạp chí Time tổ chức, đứng thứ hai trong danh sách 100 tiểu thuyết hay nhất thế kỷ 20 của Modern Library, được đưa vào giảng dạy tại các trường trung học và đại học ở Mỹ và nhiều nước trên thế giới.\r\n\r\nGatsby vĩ đại đến nay không hẳn còn xa lạ với bạn đọc Việt Nam, để đưa bạn đọc đến cái nhìn mới và chân thật  hơn về Gatsby, HGB xin gửi tới bạn đọc bản in song ngữ Anh Việt .\r\n\r\nMời các bạn đón đọc!', '2022-08-24 20:23:20', '2022-09-25 13:45:32', '8;', '4;', 2),
(10, 'Không Gia Đình', 81000, 212, 14, 4, 'short_story', 'Không Gia Đình là cuốn sách được xếp vào danh mục văn học thiếu nhi nhưng rõ ràng, với những gì Không Gia Đình đã kể thì đây là cuốn sách dành cho mọi lứa tuổi ở mọi quốc gia, mọi tầng lớp.\r\n\r\nKhông Gia Đình là một chuyến phiêu lưu mà Rêmi là nhân vật chính. Em nghèo khổ, em cô độc, em không có người thân. Cuộc đời Rêmi gắn liền với gánh xiếc rong, với những thử thách mà em gặp phải trên đường đời trải rộng khắp nước Pháp tươi đẹp. Rêmi lớn lên trong đau khổ, lang thang mọi nơi, bị tù đà nhưng dù trong hoàn cảnh nào, em vẫn đứng thẳng lưng, ngẩng cao đầu, giữ phẩm chất làm người - điều em đã học từ cụ Vitali trong cuộc đời lang bạt của mình.\r\n\r\nKhông Gia Đình ca ngợi giá trị của lao động, của nhân cách và tình cảm. Cuốn sách mô tả những hình ảnh, những mảnh đời bấp bênh để làm nền cho niềm tin, cho tình người ấm áp.\r\n\r\nKhông Gia Đình thực sự là một cuốn sách hay và giá trị hơn cả một giá sách dạy phương pháp làm người.\r\n\r\nKhông gia đình kể chuyện một em bé không cha mẹ, không họ hàng thân thích, đi theo một đoàn xiếc chó, khỉ, rồi cầm đầu đoàn ấy đi lưu lạc khắp nước Pháp, sau đó bị tù ở Anh, cuối cùng tìm thấy mẹ và em. Em bé Rêmi ấy đã lớn lên trong gian khổ. Em đã chung đụng với mọi hạng người, sống khắp mọi nơi, \"nơi thì lừa đảo, nơi thì xót thương\". Em đã lao động mà sống, lúc đầu dưới quyền điều khiển của một ông già từng trải và đạo đức, cụ Vitali, về sau thì tự lập và không những lo cho mình, còn bảo đảm việc biểu diễn và sinh sống cho cả một gánh hát rong. Đã có khi em và cả đoàn lang thang mấy hôm liền không có chút gì trong bụng. Đã có khi em suýt chết rét. Đã có khi em bị lụt ngầm chôn trong giếng mỏ mười mấy ngày đêm. Đã có khi em mắc oan bị giải ra trước tòa và bị ở tù.\r\n\r\nVà cũng có khi em được nuôi nấng đàng hoàng, no ấm. Nhưng dù ở đâu, trong cảnh ngộ nào, em vẫn noi theo nếp rèn dạy của ông già Vitali giữ phẩm chất làm người, nghĩa là ngay thẳng, gan dạ, tự trọng, thương người, ham lao động, không ngửa tay xin xỏ, không dối trá, gian giảo, nhớ ơn nghĩa, luôn luôn muốn làm người có ích.\r\n\r\nMã hàng	8935072950408\r\nNhà Cung Cấp	Cty Văn Hóa Nhân Văn\r\nTác giả	Hector malot\r\nNXB	NXB Thanh Hóa\r\nNăm XB	2019\r\nTrọng lượng (gr)	250\r\nKích Thước Bao Bì	13 x 21 cm\r\nSố trang	212\r\nHình thức	Bìa Mềm\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Tác Phẩm Kinh Điển bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nKhông Gia Đình là cuốn sách được xếp vào danh mục văn học thiếu nhi nhưng rõ ràng, với những gì Không Gia Đình đã kể thì đây là cuốn sách dành cho mọi lứa tuổi ở mọi quốc gia, mọi tầng lớp.\r\n\r\nKhông Gia Đình là một chuyến phiêu lưu mà Rêmi là nhân vật chính. Em nghèo khổ, em cô độc, em không có người thân. Cuộc đời Rêmi gắn liền với gánh xiếc rong, với những thử thách mà em gặp phải trên đường đời trải rộng khắp nước Pháp tươi đẹp. Rêmi lớn lên trong đau khổ, lang thang mọi nơi, bị tù đà nhưng dù trong hoàn cảnh nào, em vẫn đứng thẳng lưng, ngẩng cao đầu, giữ phẩm chất làm người - điều em đã học từ cụ Vitali trong cuộc đời lang bạt của mình.\r\n\r\nKhông Gia Đình ca ngợi giá trị của lao động, của nhân cách và tình cảm. Cuốn sách mô tả những hình ảnh, những mảnh đời bấp bênh để làm nền cho niềm tin, cho tình người ấm áp.\r\n\r\nKhông Gia Đình thực sự là một cuốn sách hay và giá trị hơn cả một giá sách dạy phương pháp làm người.\r\n\r\nKhông gia đình kể chuyện một em bé không cha mẹ, không họ hàng thân thích, đi theo một đoàn xiếc chó, khỉ, rồi cầm đầu đoàn ấy đi lưu lạc khắp nước Pháp, sau đó bị tù ở Anh, cuối cùng tìm thấy mẹ và em. Em bé Rêmi ấy đã lớn lên trong gian khổ. Em đã chung đụng với mọi hạng người, sống khắp mọi nơi, \"nơi thì lừa đảo, nơi thì xót thương\". Em đã lao động mà sống, lúc đầu dưới quyền điều khiển của một ông già từng trải và đạo đức, cụ Vitali, về sau thì tự lập và không những lo cho mình, còn bảo đảm việc biểu diễn và sinh sống cho cả một gánh hát rong. Đã có khi em và cả đoàn lang thang mấy hôm liền không có chút gì trong bụng. Đã có khi em suýt chết rét. Đã có khi em bị lụt ngầm chôn trong giếng mỏ mười mấy ngày đêm. Đã có khi em mắc oan bị giải ra trước tòa và bị ở tù.\r\n\r\nVà cũng có khi em được nuôi nấng đàng hoàng, no ấm. Nhưng dù ở đâu, trong cảnh ngộ nào, em vẫn noi theo nếp rèn dạy của ông già Vitali giữ phẩm chất làm người, nghĩa là ngay thẳng, gan dạ, tự trọng, thương người, ham lao động, không ngửa tay xin xỏ, không dối trá, gian giảo, nhớ ơn nghĩa, luôn luôn muốn làm người có ích.', '2022-08-24 20:23:20', '2022-09-25 13:45:53', '10', '2;6;', 2),
(14, 'Blue soda', 123333, 123, 3, 12, 'short_story', 'asd', '2022-08-26 15:41:58', '2022-08-26 15:41:58', '123', NULL, 2),
(15, 'The Sandman', 200000, 345, 34, 12, 'comic', 'One of the endless', '2022-09-07 15:28:25', '2022-09-12 12:23:32', '11', NULL, 2),
(17, 'War and Peace', 200000, 600, 26, 6, 'novel', 'Bla bla bla', '2022-09-11 10:25:54', '2022-09-12 14:49:30', '12', '', 2);
INSERT INTO `wp_book` (`id`, `name`, `price`, `page_number`, `remain_number`, `bought_number`, `type`, `description`, `created`, `modified`, `author_id`, `voucher_id`, `image_number`) VALUES
(19, 'Lord of the ring', 200000, 600, 53, 19, 'novel', 'Phần Thứ Nhất\r\nTập đại thành Tiểu thuyết kỳ ảo\r\ncủa J.R.R. Tolkien\r\n \r\nKỷ Đệ Nhất, các Valar kết liễu Morgoth.\r\nKỷ Đệ Nhị, Tiên và Người đánh bại Sauron.\r\nVà nay, giữa Kỷ Đệ Tam tưởng đã hòa bình, báu vật của Sauron lại ngóc đầu trong lòng núi.\r\n \r\nVà thêm một anh chàng Hobbit bỗng thấy mình từ biệt tổ ấm yên bình, dấn vào cuộc phiêu lưu mỗi bước lại thêm xa, thêm gian nan, thêm hệ trọng. Bên cậu sát cánh Đoàn Hộ Nhẫn, Con Người cùng Phù Thủy, Tiên với Người Lùn, vượt đèo cả đầm sâu, qua rừng vàng mỏ tối, vào sinh ra tử hòng lần nữa cứu Trung Địa khỏi rơi vào tay\r\nCHÚA TỂ NHỮNG CHIẾC NHẪN.\r\n \r\n \r\n \r\nNhận định\r\n \r\n“Cộng đồng Anh ngữ được phân làm hai: những người đã đọc Anh chàng Hobbit cùng Chúa tể những chiếc nhẫn, và những người sẽ đọc.”\r\n- Sunday Times\r\n \r\n“Tín đồ Thiên Chúa giáo chưa đọc hết Kinh thánh còn có thể tạm tha thứ, chứ một fan tiểu thuyết kỳ ảo mà chưa đọc cuốn phúc âm của thể loại kỳ ảo này thì không thể chấp nhận được.”\r\n- Amazon.com\r\n \r\n“Tolkien may mắn được ban tặng tài đặt tên chính xác và con mắt quan sát diệu kỳ; kết thúc cuốn I, bạn đọc đã nắm rõ lịch sử Hobbit, người Tiên, Người Lùn cùng sông núi quê hương họ chẳng kém gì nắm rõ xứ sở tuổi thơ mình. Và nếu nhìn nhận một câu chuyện kỳ ảo là nghiêm túc, ai cũng phải thấy rằng dù bề ngoài trình bày những nhân vật và sự kiện khác xa thế giới ta đang sống, đấy vẫn là tấm gương soi hiện thực duy nhất mà ta biết: hiện thực của chúng ta.”\r\n- W. H. Auden\r\nMã hàng	8935235204799\r\nTên Nhà Cung Cấp	Nhã Nam\r\nTác giả	JRR Tolkien\r\nNXB	Văn Học\r\nNăm XB	05/2015\r\nTrọng lượng (gr)	500\r\nKích Thước Bao Bì	15 x 24\r\nSố trang	508\r\nHình thức	Bìa Mềm\r\nSản phẩm bán chạy nhất	Top 100 sản phẩm Huyền Bí - Giả Tưởng - Kinh Dị bán chạy của tháng\r\nGiá sản phẩm trên Fahasa.com đã bao gồm thuế theo luật hiện hành. Bên cạnh đó, tuỳ vào loại sản phẩm, hình thức và địa chỉ giao hàng mà có thể phát sinh thêm chi phí khác như Phụ phí đóng gói, phí vận chuyển, phụ phí hàng cồng kềnh,...\r\nPhần Thứ Nhất\r\nTập đại thành Tiểu thuyết kỳ ảo\r\ncủa J.R.R. Tolkien\r\n \r\nKỷ Đệ Nhất, các Valar kết liễu Morgoth.\r\nKỷ Đệ Nhị, Tiên và Người đánh bại Sauron.\r\nVà nay, giữa Kỷ Đệ Tam tưởng đã hòa bình, báu vật của Sauron lại ngóc đầu trong lòng núi.\r\n \r\nVà thêm một anh chàng Hobbit bỗng thấy mình từ biệt tổ ấm yên bình, dấn vào cuộc phiêu lưu mỗi bước lại thêm xa, thêm gian nan, thêm hệ trọng. Bên cậu sát cánh Đoàn Hộ Nhẫn, Con Người cùng Phù Thủy, Tiên với Người Lùn, vượt đèo cả đầm sâu, qua rừng vàng mỏ tối, vào sinh ra tử hòng lần nữa cứu Trung Địa khỏi rơi vào tay\r\nCHÚA TỂ NHỮNG CHIẾC NHẪN.\r\n \r\n \r\n \r\nNhận định\r\n \r\n“Cộng đồng Anh ngữ được phân làm hai: những người đã đọc Anh chàng Hobbit cùng Chúa tể những chiếc nhẫn, và những người sẽ đọc.”\r\n- Sunday Times\r\n \r\n“Tín đồ Thiên Chúa giáo chưa đọc hết Kinh thánh còn có thể tạm tha thứ, chứ một fan tiểu thuyết kỳ ảo mà chưa đọc cuốn phúc âm của thể loại kỳ ảo này thì không thể chấp nhận được.”\r\n- Amazon.com\r\n \r\n“Tolkien may mắn được ban tặng tài đặt tên chính xác và con mắt quan sát diệu kỳ; kết thúc cuốn I, bạn đọc đã nắm rõ lịch sử Hobbit, người Tiên, Người Lùn cùng sông núi quê hương họ chẳng kém gì nắm rõ xứ sở tuổi thơ mình. Và nếu nhìn nhận một câu chuyện kỳ ảo là nghiêm túc, ai cũng phải thấy rằng dù bề ngoài trình bày những nhân vật và sự kiện khác xa thế giới ta đang sống, đấy vẫn là tấm gương soi hiện thực duy nhất mà ta biết: hiện thực của chúng ta.”\r\n- W. H. Auden', '2022-09-12 14:57:51', '2022-09-12 14:57:51', '13', '', 2),
(20, 'Anna Karenia', 320000, 600, 34, 2, 'novel', 'Anna the stupid one', '2022-09-17 15:01:56', '2022-09-17 15:01:56', '12', '2;4;', 2),
(21, 'Cypberpunk Edge-runner', 560000, 600, 60, 20, 'comic', 'i dont like it', '2022-09-25 15:19:07', '2022-09-25 15:19:07', '1;', '2;5;', 2);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wp_buy_log`
--

CREATE TABLE `wp_buy_log` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `receive_id` int(11) DEFAULT NULL,
  `book_id` int(11) DEFAULT NULL,
  `price` varchar(20) DEFAULT NULL,
  `number` smallint(6) DEFAULT NULL,
  `item_voucher_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `wp_buy_log`
--

INSERT INTO `wp_buy_log` (`id`, `user_id`, `receive_id`, `book_id`, `price`, `number`, `item_voucher_id`) VALUES
(1, 2, 1, 3, '123000', 2, 3),
(2, 2, 1, 4, '77000', 2, 3),
(3, 2, 2, 3, '123000', 2, 3),
(4, 2, 2, 4, '77000', 2, 3),
(5, 2, 3, 3, '123000', 3, 3),
(6, 2, 4, 9, '81000', 3, 0),
(7, 2, 4, 6, '112000', 2, 3),
(8, 2, 5, 4, '77000', 3, 3),
(9, 2, 5, 8, '142000', 2, 0);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wp_receive`
--

CREATE TABLE `wp_receive` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `total_price` bigint(20) UNSIGNED DEFAULT NULL,
  `transport` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `voucher_id` int(11) DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `code` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Đang đổ dữ liệu cho bảng `wp_receive`
--

INSERT INTO `wp_receive` (`id`, `user_id`, `created`, `total_price`, `transport`, `address`, `voucher_id`, `state`, `description`, `code`) VALUES
(1, 2, '2022-09-20 21:52:58', 340000, 'Express', 'Long Bien, Ha Noi, Viet Nam', 0, 3, 'Message: 123213', 'nczwisrb'),
(2, 2, '2022-09-20 21:54:41', 340000, 'Express', 'Long Bien, Ha Noi, Viet Nam', 0, 2, 'Message: no ok', 'nczwisrb'),
(3, 2, '2022-09-20 21:55:20', 308650, 'Express', 'Long Bien, Ha Noi, Viet Nam', 4, 3, 'Cancel by user: dont', 'nczwisrb'),
(4, 2, '2022-09-25 19:43:13', 393400, 'Shoppee', 'Long Bien, Ha Noi, Viet Nam', 6, 3, 'Cancel by admin: Anna the stupid one', 'kmkstcja'),
(5, 2, '2022-09-26 10:43:51', 475350, 'Express', 'Long Bien, Ha Noi, Viet Nam', 4, 3, 'Cancel by admin: 123213', 'iogwhadw');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `wp_voucher`
--

CREATE TABLE `wp_voucher` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `threshold` int(11) DEFAULT NULL,
  `number_thres` int(11) DEFAULT NULL,
  `discount` int(11) DEFAULT NULL,
  `discount_rate` float DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `modified` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Đang đổ dữ liệu cho bảng `wp_voucher`
--

INSERT INTO `wp_voucher` (`id`, `name`, `threshold`, `number_thres`, `discount`, `discount_rate`, `created`, `modified`) VALUES
(1, 'None', 0, 0, 0, 0, '0000-00-00 00:00:00', '0000-00-00 00:00:00'),
(2, 'DISCOUNT2', 0, 2, 0, 0.1, '2022-09-13 11:28:39', '2022-09-13 17:47:45'),
(3, 'DISCOUNT3', 0, 3, 0, 0.15, NULL, NULL),
(4, 'PRICE100', 100000, 0, 5000, 0, '2022-05-11 11:33:30', '2022-09-15 15:51:01'),
(5, 'PRICE200', 200000, 0, 15000, 0, '2022-08-15 17:12:04', '2022-09-15 15:51:33'),
(6, 'PRICE300', 300000, 0, 40000, 0, '2022-05-11 11:33:30', '2022-09-15 15:52:34'),
(7, 'PRICE400', 400000, 400000, 50000, 0, '2022-09-17 15:05:57', '2022-09-17 15:05:57'),
(9, 'PRICE500', 500000, 0, 50000, 0, '2022-09-17 15:15:51', '2022-09-17 15:18:04');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Chỉ mục cho bảng `wp_author`
--
ALTER TABLE `wp_author`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `wp_book`
--
ALTER TABLE `wp_book`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `wp_buy_log`
--
ALTER TABLE `wp_buy_log`
  ADD PRIMARY KEY (`id`),
  ADD KEY `receive_id` (`receive_id`),
  ADD KEY `user_id` (`user_id`),
  ADD KEY `book_id` (`book_id`);

--
-- Chỉ mục cho bảng `wp_receive`
--
ALTER TABLE `wp_receive`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Chỉ mục cho bảng `wp_voucher`
--
ALTER TABLE `wp_voucher`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT cho bảng `wp_author`
--
ALTER TABLE `wp_author`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT cho bảng `wp_book`
--
ALTER TABLE `wp_book`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT cho bảng `wp_buy_log`
--
ALTER TABLE `wp_buy_log`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT cho bảng `wp_receive`
--
ALTER TABLE `wp_receive`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `wp_voucher`
--
ALTER TABLE `wp_voucher`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `wp_buy_log`
--
ALTER TABLE `wp_buy_log`
  ADD CONSTRAINT `wp_buy_log_ibfk_1` FOREIGN KEY (`receive_id`) REFERENCES `wp_receive` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `wp_buy_log_ibfk_2` FOREIGN KEY (`book_id`) REFERENCES `wp_book` (`id`) ON DELETE NO ACTION;

--
-- Các ràng buộc cho bảng `wp_receive`
--
ALTER TABLE `wp_receive`
  ADD CONSTRAINT `wp_receive_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
